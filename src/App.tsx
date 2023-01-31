import { useEffect, useState } from "react";
import axios from "axios";
import firebaseInit from "./firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

function App() {
  type userType = {
    name: string | null;
    image: string | null;
  };

  const [result, setResult] = useState<any>();
  const [user, setUser] = useState<userType>({
    name: "",
    image: "",
  });

  const provider = new GoogleAuthProvider();
  const app = firebaseInit();
  const auth = getAuth(app);

  function register() {
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("http://localhost:5000/register", {
            uid: result.user.uid,
            name: result.user.displayName,
            email: result.user.email,
          })
          .then((res) => {
            if (res.data.response === true) alert("Registered");
            else alert("Account already exist");
          })
          .catch((err) => alert(err));

        setUser({
          name: result.user.displayName,
          image: result.user.photoURL,
        });
        setResult(result);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <div className="App">
      {user.name ? (
        <div>
          <img src={`${user.image}`} alt="profile-pic" />
          <p>{user.name}</p>
          <p>Details:</p>
          <p>{JSON.stringify(result.user)}</p>
        </div>
      ) : (
        <button onClick={register}>SIGN-IN</button>
      )}
    </div>
  );
}

export default App;
