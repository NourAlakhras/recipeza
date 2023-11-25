

// Frontend/src/components/RecipePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'; // Import the useParams hook
import '../styles/RecipePage.css';
function RecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Use the useParams hook to get the 'id' parameter

  useEffect(() => {
    axios
      .get(`http://localhost:3000/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        setError("Sorry, could not fetch the recipe for that resource :(");
        console.log(error);
      });
  }, [id]);

  if (!recipe) {
    return <div>{error || "Loading..."}</div>;
  }

  return (
    <div className='bodyContainer'>
<header className='headerCont'>
<div>
{id}
<img src="../img/logo.png" alt="Logo" id="logo" />
</div>
<div id="navigation">
{/* Navigation links */}
<a href="#" className="active">
Home
</a>
<a href="#">Spaghetti Aglio e Olio Recipe</a>
</div>
<div id="user-profile">
{/* User profile section */}
<img src="./img/milk.png" alt="User Profile" />
<div className="user-name">@joodyK</div>
</div>
</header>
<div id="main-container">
<div id="image-container">
{/* Static Image */}
<img src='../src/assets/dish 5.jpg' alt="Spaghetti Aglio e Olio" />
<div id="userAccount">
        {/* User account section */}
        <img
          className="ingredient-icon"
          src="./img/user.png"
          alt="User Icon"
        />
      </div>
    </div>

    <div id="ingredients-container">
      <div>
        <div id="recipe-title">{recipe.name}</div>
        <div id="ingredients-title">Ingredients:</div>
      </div>

      <div className="ingredient">
        <div className="ingredient-name">
        <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
                ))}
              </ul>
        </div>
      </div>
    </div>
  </div>

  <div id="recipe-steps">
    <h2>Recipe Steps</h2>
    <ol id="olSteps">
    {recipe.instructions.split('\n').map((step, index) => (
            <li key={index}>{step}</li>
          ))}
    </ol>
  </div>
</div>
);
};


export default RecipePage;