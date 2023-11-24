import  { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import '../styles/Auth.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
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
                <Form.Group controlId="formBasicName">
                    <Form.Label>
                        <FontAwesomeIcon icon={faUser} /> Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your name.
                    </Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>
                        <FontAwesomeIcon icon={faLock} /> Confirm Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Passwords do not match.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </div>
    );
};

export default SignUp;
