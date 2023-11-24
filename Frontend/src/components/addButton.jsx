import { useState } from "react";
import "../styles/card.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//import axios from "axios";

function AddButton() {
  //modal
  const [showModal, setShowModal] = useState(false);
  //data
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [recipeImages, setRecipeImages] = useState(null);
  const [recipeInstructions, setRecipeInstructions] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      name: ingredientName,
      quantity: ingredientQuantity,
      unit: ingredientUnit,
    };
    setIngredients([...ingredients, newIngredient]);
    setIngredientName("");
    setIngredientQuantity("");
    setIngredientUnit("");
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setRecipeImages(file);
  };

  const handleAddRecipe = (e) => {
    // const newRecipe = {
    //   name: recipeName,
    //   ingredients: ingredients,
    //   instructions: recipeInstructions,
    //   images: recipeImages,
    // };

    // // Send the new recipe data to the server
    // axios
    //   .post("http://localhost:3000/recipes", newRecipe)
    //   .then((response) => {
    //     // Handle successful response from the server
    //     console.log("Recipe added successfully!", response);
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Handle error response from the server
    //     console.error("Failed to add recipe:", error);
    //     // ...
    //   });

    e.preventDefault();

    const recipe = {
      recipeName,
      ingredients,
      recipeInstructions,
      recipeImages,
    };

    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    }).then(() => {
      console.log("new recipe added");
    });

    handleCloseModal();
  };

  

  return (
    <>
      <div className="buttonAddingContainer">
        <button
          className="btn btn-primary glitter-btn"
          onClick={handleShowModal}
        >
          <span className="add-icon">+</span>
          New Recipe
        </button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Recipe Name */}
          <label>Recipe Name:</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />

          {/* Recipe Ingredients */}
          <div>
            <h5>Recipe Ingredients</h5>
            {ingredients.map((ingredient, index) => (
              <div key={index}>
                <label>Ingredient Name:</label>
                <input type="text" value={ingredient.name} readOnly />
                <label>Ingredient Quantity:</label>
                <input type="number" value={ingredient.quantity} readOnly />
                <label>Ingredient Unit:</label>
                <input type="text" value={ingredient.unit} readOnly />
                <button onClick={() => handleRemoveIngredient(index)}>
                  Remove
                </button>
              </div>
            ))}
            <div>
              <label>Ingredient Name:</label>
              <input
                type="text"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
              />
              <label>Ingredient Quantity:</label>
              <input
                type="number"
                value={ingredientQuantity}
                onChange={(e) => setIngredientQuantity(e.target.value)}
              />
              <label>Ingredient Unit:</label>
              <input
                type="text"
                value={ingredientUnit}
                onChange={(e) => setIngredientUnit(e.target.value)}
              />
              <button onClick={handleAddIngredient}>Add Ingredient</button>
            </div>
          </div>

          <label>Recipe Instructions:</label>
          <input
            value={recipeInstructions}
            onChange={(e) => setRecipeInstructions(e.target.value)}
          />

          {/* Recipe Image */}
          <div>
            <label>Recipe Images:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRecipe}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddButton;
