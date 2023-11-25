// Frontend\src\components\Navbar.jsx
import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { BsSearch } from 'react-icons/bs';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/App.css";
import "../styles/card.css";

function HomeNavbar() {
  const [authenticated, setAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    // Check if there is a token in localStorage
    const token = localStorage.getItem('token');

    // Update the authentication status based on the presence of the token
    setAuthenticated(!!token);
  }, []);

  return (
    <>
      <div className="header-container">
        <header className="header-image">
          <Navbar className="navbar-transparent">
            <Container>
              <Navbar.Brand>
                <Link to="/">
                  <img src="src/assets/web-logo.png" width="160" alt="Logo" />
                </Link>
              </Navbar.Brand>
              <form>
                <input type="text" name="" placeholder="Search..." />
                <button type="submit" className="searchButton"><BsSearch /></button>
              </form>
              <div>
                {authenticated ? (
                  <>
                    {/* User is authenticated, show user profile and logout */}
                    <Link to="/UserProfile">
                      <button className="btn btn-primary glitter-btn">
                        User Profile
                      </button>
                    </Link>
                    <button className="btn btn-primary glitter-btn" onClick={() => {
                      localStorage.removeItem('token');
                      setAuthenticated(false);
                    }}>
                      Logout
                    </button>
                  </>
                ) : (
                  // User is not authenticated, show login/signup
                  <Link to="/login">
                    <button className="btn btn-primary glitter-btn">
                      Login/Signup
                    </button>
                  </Link>
                )}
              </div>
            </Container>
          </Navbar>
        </header>
      </div>
    </>
  );
}

export default HomeNavbar;
