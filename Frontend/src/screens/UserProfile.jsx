import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";
import "../styles/userProfile.css";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../styles/myTabs.css";

function UserProfile() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const userIdFromToken = decodedToken.userId;

      const fetchUserData = async () => {
        try {
          // Make a GET request to fetch user data using the user ID from the token
          const response = await axios.get(`http://localhost:3000/user/${userIdFromToken}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  if (!user) {
    // You might want to add a loading state or an error message here
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bodyContainer1">
        <header className="headerDesign">
          <Navbar className="navbar-transparent">
            <Navbar.Brand>
              <Link to="/">
                <img src="src/assets/web-logo.png" width="140" alt="Logo" />
              </Link>
            </Navbar.Brand>
          </Navbar>
        </header>
      </div>

      <div className="container">
        <Card style={{ width: "18rem", margin: "20px" }}>
          <Card.Img
            variant="top"
            src="src/assets/profile-user-icon.jpg"
            style={{ borderRadius: "50%" }}
          />
          <Card.Body>
            <Card.Title style={{ color: "#B73E3E" }}>Name:{user.name}</Card.Title>
            <Card.Text>
              Email: {user.email}
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="about-box">
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="My Recipes">
              <div className="tab-content">
                <Card
                  style={{
                    width: "250px",
                    height: "fit-content",
                    margin: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src="src/assets/dish 4.jpg"
                      style={{
                        width: "200px",
                        alignItems: "center",
                        margin: "10px",
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title style={{ color: "#B73E3E" }}>
                      Recipe Name
                    </Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the content.
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "10px",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#B73E3E",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "5px",
                        }}
                      >
                        Edit
                      </button>
                      <div style={{ width: "10px" }}></div>{" "}
                      {/* Space between buttons */}
                      <button
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#4A90E2",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "5px",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Saved Recipes">
              <div className="tab-content">
                {/* Tab content for Saved Recipes */}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
export default UserProfile;
