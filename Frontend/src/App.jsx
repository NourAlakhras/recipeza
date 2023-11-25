// Frontend\src\App.jsx
import React, { useEffect, useState } from "react";
import "./App.css";
import HomeNavbar from "./components/Navbar";
import CardContainer from "/src/components/Card.jsx";
import AddButton from "./components/addButton";
import RecipePage from "./screens/RecipePage";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


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
          console.log("Recipes from the backend:", response.data);

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
        <Routes>
          <Route path="/" element={<CardContainer recipes={recipes} />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
