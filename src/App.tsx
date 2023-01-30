import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const data = axios
      .get("http://localhost:5000")
      .then((data) => console.log(data))
      .catch((err) => err);
  }, []);

  return <div className="App">Hello World!</div>;
}

export default App;
