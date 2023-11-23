import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/main.css";
import { BsSearch } from 'react-icons/bs';


function HomeNavbar() {
  return (
    <>
      <div className="header-container">
        <header className="header-image">
          <Navbar className="navbar-transparent">
            <Container>
              <Navbar.Brand href="#">
                <img src="src/assets/web-logo.png" width="150" alt="Logo" />
              </Navbar.Brand>
              <Form className="d-flex flex-grow-1 justify-content-center">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="rounded-pill me-2"
                  aria-label="Search"
                />
                <Button variant="outline-secondary">
                  <BsSearch />
                </Button>
              </Form>
              <Nav>
                <Button variant="primary">Login</Button>
              </Nav>
            </Container>
          </Navbar>
        </header>
      </div>
    </>
  );
}

export default HomeNavbar;
