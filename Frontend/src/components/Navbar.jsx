import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "/src/App.css";
import { BsSearch } from 'react-icons/bs';
import "../styles/card.css";
import { Link }  from "react-router-dom";




function HomeNavbar() {
  return (
    <>
      <div className="header-container">
        <header className="header-image">
          <Navbar className="navbar-transparent">
            <Container>
              <Navbar.Brand >
               <Link to="/"> <img src="src/assets/web-logo.png" width="160" alt="Logo" /></Link>
              </Navbar.Brand>
              <form>
        <input type="text" name="" placeholder="Search..." />
        <button type="submit" className="searchButton"><BsSearch /></button>
      </form>
              <div>
                <Link to="/login">
                    <button className="btn btn-primary glitter-btn">
                  Login/Signup
                </button>
                </Link>
              </div>
            </Container>
          </Navbar>
        </header>
      </div>
    </>
  );
}

export default HomeNavbar;
