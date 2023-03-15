import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function BadgerRegister() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handlePasswordConfirmationChange = (event) => {
        setPasswordConfirmation(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === "" || password === "") {
            alert("You must provide both a username and password!");
        } else if (password !== passwordConfirmation) {
            alert("Your passwords do not match!")
        } else {
            // a large part of this code snippet is copied from lecture slides
            fetch("https://www.cs571.org/s23/hw6/api/register", {
                method: "POST",
                credentals: "include",
                headers: {
                    "X-CS571-ID": "bid_30e5ed25e99b26f8f91c",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            }).then((res) => {
                if (res.status === 409) {
                    alert("That username has already been taken!");
                } else if (res.status === 200) {
                    alert("Successfully registered!");
                    navigate("/login");
                }
                return res.json();
            }).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    // a large part of this code snippet is pasted from react-bootstrap doc: https://react-bootstrap.netlify.app/forms/overview/#rb-docs-content
    return <Container>
        <h1>Register</h1>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password again" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    </Container>
}