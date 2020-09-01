import React, { useState, useEffect } from 'react';
import socket from 'socket.io-client';
import './chat.css';

const Chat = props => {
    const [client] = useState(() => {
        const initialState = socket('4040');
        return initialState;
    });

    useEffect(() => {
        if (client) {
            const abortController = new AbortController();
            console.log('connected to socket');
            return function cleanup() {
                abortController.abort();
            }
        }
    }, []);

    return (
        <div>
            Chat component
        </div>
    )
}

export default Chat;