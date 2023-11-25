import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import '../styles/Auth.css';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email,
          password,
        });

        if (response.status === 200) {
          const data = response.data;

          // Extract the token from the response data
          const token = data.token;

          // Store the token in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('userInfo',data)
          console.log('Login successful:', data);

          navigate('/');
        } else {
          console.error('Error logging in:', response.data);
          // Handle the error, show a message, etc.
        }
      } catch (error) {
        console.error('Error logging in:', error);
        // Handle the error, show a message, etc.
      }
    }

    setValidated(true);
  };

  return (
    <>
      <header className="headerDesign">
        <Navbar className="navbar-transparent">
          <Navbar.Brand>
            <Link to="/">
              <img src="src/assets/web-logo.png" width="140" alt="Logo" />
            </Link>
          </Navbar.Brand>
        </Navbar>
      </header>
      <div className="auth-container">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <FontAwesomeIcon icon={faEnvelope} style={{ color: '#B73E3E', fontWeight: 'bold' }} /> Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-fields"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <FontAwesomeIcon icon={faLock} style={{ color: '#B73E3E', fontWeight: 'bold' }} /> Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-fields"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          <div>
            <button type="submit" className="btn btn-primary glitter-btn">Login</button>
          </div>

          <div className="registerText">
            Do you already have an account? <Link to="/signup" style={{ color: '#B73E3E' }}>Register here</Link>
          </div>
        </Form>
      </div>

      <div className="footer" style={{ textAlign: 'center' }}>
        &copy; 2023 Resipeza. All rights reserved.
      </div>
    </>
  );
};

export default Login;