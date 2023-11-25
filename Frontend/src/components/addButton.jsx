import { useState } from "react";
import "../styles/card.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Cookies from "js-cookie"; // Import the Cookies library



function AddButton() {
  // modal
  const [showModal, setShowModal] = useState(false);
  // data
  const [name, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [recipeImages, setRecipeImages] = useState(null);
  const [instructions, setRecipeInstructions] = useState("");

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

const handleAddRecipe = async (e) => {
  e.preventDefault();

  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');
  console.log('Received Token:', token);

  if (!token) {
    console.error('User not authenticated');
    // Handle the case where the user is not authenticated, e.g., redirect to login
    return;
  }

  const recipe = {
    name: name,
    instructions: instructions,
    ingredients: ingredients,
    images: recipeImages,
  };
  

  try {
    const response = await axios.post("http://localhost:3000/recipes", recipe, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Set the Authorization header with the token
      },
    });
  
    if (response.status === 201) {
      console.log("New recipe added successfully");
    } else {
      console.error("Failed to add recipe:", response.data);
    }
  } catch (error) {
    console.error("Error adding recipe:", error);
  }
  

  handleCloseModal();
};

  return (
    <>
      <div className="buttonAddingContainer">
        <button className="btn btn-primary glitter-btn" onClick={handleShowModal}>
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
            value={name}
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
                <button onClick={() => handleRemoveIngredient(index)}>Remove</button>
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
            value={instructions}
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
