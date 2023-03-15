import React, { useContext, useEffect } from 'react';
import LoggedInContext from '../../contexts/LoggedInContext';

export default function BadgerLogout() {

    const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_30e5ed25e99b26f8f91c"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setLoggedIn(false);
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}