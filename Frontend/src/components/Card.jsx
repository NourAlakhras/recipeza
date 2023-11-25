import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../styles/card.css";
import { Link } from "react-router-dom";

function CardContainer({ recipes }) {
  const [bookmarks, setBookmarks] = useState(Array.from({ length: 10 }, () => false));

  const toggleBookmark = (index) => {
    const updatedBookmarks = [...bookmarks];
    updatedBookmarks[index] = !updatedBookmarks[index];
    setBookmarks(updatedBookmarks);
  };

  if (!Array.isArray(recipes) || recipes.length === 0) {
    return <div>No recipes available.</div>;
  }

  return (
    <div className="cardsContainer">
      <Row xs={1} md={2} lg={4}>
        {recipes.map((recipe, index) => (
          <Col key={index}>
            <Card className="custom-card d-flex justify-content-center">
              <Card.Img
                variant="top"
                src="src\assets\dish 5.jpg"
                className="image"
              />
              <Card.Body>
                <Card.Title className="card-title">{recipe.name}</Card.Title>
                <Card.Text className="card-text">
                  {recipe.instructions}
                </Card.Text>
              </Card.Body>
              <div className="d-flex align-items-center justify-content-around cardFooter">
                <button
                  onClick={() => toggleBookmark(index)}
                  style={{ background: "none", border: "none" }}
                >
                  {bookmarks[index] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bookmark-fill"
                      viewBox="0 0 16 16"
                      style={{ color: "currentColor" }}
                    >
                      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bookmark"
                      viewBox="0 0 16 16"
                      style={{ color: "currentColor" }}
                    >
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                  )}
                </button>
                <Link to={`/recipe/${recipe._id}`}>
                  <button className="btn btn-primary glitter-btn">
                    Open Recipe
                  </button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardContainer;
