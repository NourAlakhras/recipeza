import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import '../styles/Auth.css';
import { Link }  from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="auth-container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>
            <FontAwesomeIcon icon={faEnvelope} /> Email address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>
            <FontAwesomeIcon icon={faLock} /> Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
