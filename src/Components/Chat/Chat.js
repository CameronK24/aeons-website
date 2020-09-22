import React, { useState, useEffect } from 'react';
import socket from 'socket.io-client';
import './chat.css';

const Chat = props => {
    const [client] = useState(() => {
        const initialState = socket('http://localhost:4040');
        return initialState;
    });
    const [openDisplay, setOpenDisplay] = useState({display: 'inline'});
    const [closeDisplay, setCloseDisplay] = useState({display: 'none'});
    const [chatWindow, setChatWindow] = useState('chat-window');

    useEffect(() => {
        if (client) {
            const abortController = new AbortController();
            console.log('connected to socket');
            return function cleanup() {
                abortController.abort();
            }
        }
    }, []);

    const toggleChat = () => {
        if (openDisplay.display === 'inline') {
            setOpenDisplay({display: 'none'});
            setCloseDisplay({display: 'inline'});
            setChatWindow('chat-window-2');
        }
        else {
            setOpenDisplay({display: 'inline'});
            setCloseDisplay({display: 'none'});
            setChatWindow('chat-window');
        }
    }

    const transition = {transition: 'ease-in-out'};

    return (
        <div className={chatWindow}>
            <section className='open-close-chat' onClick={toggleChat}>
                <p className='open-chat' style={openDisplay}>
                    Open Chat
                </p>
                <p className='close-chat' style={closeDisplay}>
                    Close Chat
                </p>
                <ion-icon name="chatbox"></ion-icon>
            </section> 
            <section className='chat-view' style={closeDisplay}>
                <section className='send-chat'>
                    <input className='chat-input'/>
                    <button><ion-icon name="send"></ion-icon></button>
                </section>
                <section className='chat-display'>

                </section>
            </section>
        </div>
    )
}

export default Chat;