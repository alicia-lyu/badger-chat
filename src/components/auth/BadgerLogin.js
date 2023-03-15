import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


// a large part of the file is copied from BadgerRegister component
export default function BadgerLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === "" || password === "") {
            alert("You must provide both a username and password!");
        } else {
            fetch("https://www.cs571.org/s23/hw6/api/login", {
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
                if (res.status === 404) {
                    alert("Incorrect username!");
                } else if (res.status === 401) {
                    alert("Incorrect password!");
                } else if (res.status === 200) {
                    alert("Successfully logged in!");
                    navigate("/chatrooms/Bascom");
                }
                return res.json();
            }).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }


    // TODO Create the login component.

    return <Container>
        <h1>Login</h1>
        <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
        </Button>
    </Container>
}