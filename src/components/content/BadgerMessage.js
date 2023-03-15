import React, { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import LoggedInContext from "../../contexts/LoggedInContext";

function BadgerMessage(props) {

    const dt = new Date(props.created);
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

    useEffect(() => {
        if (loggedIn) {
            fetch("https://cs571.org/s23/hw6/api/whoami", {
                credentials: "include",
                headers: {
                    "X-CS571-ID": "bid_30e5ed25e99b26f8f91c",
                }
            }).then((res) => {
                if (res.status === 401) {
                    console.log(res);
                    setUser(null);
                } else if (res.status === 200) {
                    res.json().then((json) => setUser(json.user.username));
                }
            })
        }
    }, [loggedIn])

    const handleDelete = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.chatroom}/messages/${props.id}`, {
            method: 'DELETE',
            headers: {
                "X-CS571-ID": "bid_30e5ed25e99b26f8f91c"
            },
            credentials: "include"
        }).then((res) => {
            if (res.status === 200) {
                alert("Successfully deleted the post!")
                props.reload();
            } else {
                res.json().then((json) => alert(json.msg));
            }
        })
    }

    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br /><br />
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            props.poster === user ?
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
                :
                <></>
        }
    </>
}

export default BadgerMessage;