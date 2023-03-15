import React, { useContext, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap";
import LoggedInContext from "../../contexts/LoggedInContext";
import BadgerMessage from "./BadgerMessage";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleContentChange = (event) => setContent(event.target.value);

    const handleSubmit = () => {
        if (title === "" || content === "") {
            alert("You must provide both a title and content!");
        } else {
            fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": "bid_30e5ed25e99b26f8f91c",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title": title,
                    "content": content
                })
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setTitle("");
                    setContent("");
                    alert("Successfully posted!");
                    loadMessages();
                }
                return res.json();
            }).then((data) => console.log(data))
            .catch((error) => console.log(error))
        }
    }

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_30e5ed25e99b26f8f91c"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    useEffect(() => {
        loadMessages()
    }, [props]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            loggedIn ?
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="text" placeholder="Enter content" value={content} onChange={handleContentChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Post!
                    </Button>
                </>
                :
                <p><em>You must be logged in to post!</em></p>
        }

        <hr />
        {
            messages.length > 0 ?
                <>
                    {
                        messages.map((message) => {
                            return <BadgerMessage
                                id={message.id}
                                title={message.title}
                                poster={message.poster}
                                content={message.content}
                                created={message.created}
                                key={message.id} 
                                reload={loadMessages}
                                chatroom={props.name}/>
                        })
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}