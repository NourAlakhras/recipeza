import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RecipePage.css';
import { useParams }  from "react-router-dom";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
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
        <div className="ingredient-name">
          Added By: <a>@ChefJohn</a>
        </div>
      </div>
    </div>

    <div id="ingredients-container">
      <div>
        <div id="recipe-title">Spaghetti Aglio e Olio Recipe</div>
        <div id="ingredients-title">Ingredients:</div>
      </div>

      <div className="ingredient">
        <div className="ingredient-name">
          <ul>
            {/* Ingredient list */}
            <li>200g Spaghetti</li>
            <li>3 cloves Garlic (thinly sliced)</li>
            <li>3 tablespoons Olive Oil</li>
            <li>Salt and Pepper to taste</li>
            <li>200g cheese</li>
          </ul>
        </div>
      </div>
      {/* Add more ingredients as needed */}
    </div>
  </div>

  <div id="recipe-steps">
    <h2>Recipe Steps</h2>
    <ol id="olSteps">
      {/* Recipe steps list */}
      <li>Cook the spaghetti according to the package instructions. Drain and set aside.</li>
      <li>In a pan, heat olive oil over medium heat. Add sliced garlic and red pepper flakes.</li>
      <li>Sauté until the garlic is golden but not browned.</li>
      <li>Add the cooked spaghetti to the pan and toss to coat with the garlic-infused oil.</li>
      <li>Season with salt and pepper to taste</li>
      <li>Serve immediately and enjoy your delicious Spaghetti Aglio e Olio!</li>
      {/* Add more steps as needed */}
    </ol>
  </div>
</div>
);
};
 

export default RecipePage;