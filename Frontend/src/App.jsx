import React, { useEffect, useState } from "react";
import "./App.css";
import HomeNavbar from "./components/Navbar";
import CardContainer from "/src/components/Card.jsx";
import AddButton from "./components/addButton";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:3000/recipes")
        .then((response) => {
          setRecipes(response.data);
          setIsPending(false);
          setError(null);
        })
        .catch((error) => {
          setIsPending(false);
          setError("Sorry, could not fetch the data for that resource :(");
          console.log(error);
        });
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      <div>
        <HomeNavbar />
      </div>
      <div>
        <AddButton />
      </div>
      <div>
        {error && <div className="error">{error}</div>}
        {isPending && <div>Loading...</div>}
        {recipes && <CardContainer recipes={recipes} />}
      </div>
    </React.Fragment>
  );
}

export default App;
