import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import socket from 'socket.io-client';
import './chat.css';

const Chat = props => {
    const [client] = useState(() => {
        const initialState = socket('http://localhost:4040');
        return initialState;
    });
    const [openDisplay, setOpenDisplay] = useState({display: 'flex'});
    const [closeDisplay, setCloseDisplay] = useState({display: 'none'});
    const [chatWindow, setChatWindow] = useState('chat-window');
    const [userOpenDisplay, setUserOpenDisplay] = useState({display: 'flex'});
    const [userCloseDisplay, setUserCloseDisplay] = useState({display: 'none'});
    const [userWindow, setUserWindow] = useState('user-window');
    const [chatMessage, setChatMessage] = useState('');
    const [newMessage, setNewMessage] = useState({});
    const [listMessages, setListMessages] = useState([]);
    const [mappedMessages, setMappedMessages] = useState([]);
    const [loggedInUsers, setLoggedInUsers] = useState([]);
    const [mappedLoggedInUsers, setMappedLoggedInUsers] = useState([]);

    useEffect(() => {
        if (client) {
            const abortController = new AbortController();
            async function getNewMessage() {
                await client.on(`chatMessage`, msg => {
                    setNewMessage({
                        characterName: msg.characterName,
                        message: msg.message
                    })
                });
            }
            // client.on('userDisconnected', () => {
            //     setNewMessage({
            //         characterName: 'User',
            //         message: 'has disconnected',
            //         disconnected: true
            //     })
            // }) 
            getNewMessage();
            return function cleanup() {
                abortController.abort();
            }
        }
    }, []);

    useEffect(() => {
        if (client) {
            if (props.user.characterName !== '') {
                async function users() {
                    await client.emit('userConnected', props.user);
                }
                users();
            }
        }
    }, [props.user])

    useEffect(() => {
        if (client) {
            client.on('userConnected', users => {
                setLoggedInUsers(users);
            })
        }
    }, [])

    useEffect(() => {
        if (client) {
            client.on('userDisconnected', users => {
                setLoggedInUsers(users);
            })
        }
    }, [])

    useEffect(() => {
        if (newMessage.message) {
            setListMessages([...listMessages, newMessage]);
        }
    }, [newMessage]);

    useEffect(() => {
        if (listMessages !== []) {
            setMappedMessages(listMessages.map((element, index) => {
                if (element.disconnected) {
                    return (
                        <div className='notMyMessage' key={index}>
                            <li>
                                <p className='chat-username'>{element.characterName}</p>
                                <p className='message-display-2'>{element.message}</p>
                            </li>
                        </div>
                    )
                }

                else {
                    if (element.characterName === props.user.characterName) {
                        console.log(element);
                        return (
                            <div className='myMessage' key={index}>
                                <li>
                                    <p className='chat-username'>Me:</p>
                                    <p className='message-display'>{element.message}</p>
                                </li>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className='notMyMessage' key={index}>
                                <li>
                                    <p className='chat-username'>{element.characterName}:</p>
                                    <p className='message-display-2'>{element.message}</p>
                                </li>
                            </div>
                        )
                    }               
                }
            })) 
        }
    }, [listMessages]);

    useEffect(() => {
        if(loggedInUsers !== []) {
            setMappedLoggedInUsers(loggedInUsers.map((element, index) => {
                return (
                    <div key={index}>
                        <Link to={{pathname: `/profile/${element.userId}`}}><li className='single-user'>
                            {element.characterName}
                        </li></Link>
                    </div>                    
                )
            }))
        }
    }, [loggedInUsers])

    const send = async () => {
        const combined = {
            characterName: props.user.characterName,
            message: chatMessage
        };
        console.log(combined);
        await client.emit('chatMessage', combined);
        setChatMessage('');
    }

    const toggleChat = () => {
        if (openDisplay.display === 'flex') {
            setOpenDisplay({display: 'none'});
            setCloseDisplay({display: 'flex'});
            setChatWindow('chat-window-2');
        }
        else {
            setOpenDisplay({display: 'flex'});
            setCloseDisplay({display: 'none'});
            setChatWindow('chat-window');
        }
    }

    const toggleUsers = () => {
        if (userOpenDisplay.display === 'flex') {
            setUserOpenDisplay({display: 'none'});
            setUserCloseDisplay({display: 'flex'});
            setUserWindow('user-window-2');
        }
        else {
            setUserOpenDisplay({display: 'flex'});
            setUserCloseDisplay({display: 'none'});
            setUserWindow('user-window');
        }
    }

    return (
        <div className='chat-component'>
            <div className={userWindow}>
                <section className='open-close-users' onClick={toggleUsers}>
                    <ion-icon name="person-circle" style={userOpenDisplay}></ion-icon>
                    <div className='x-icon' style={userCloseDisplay}>X</div>
                </section>
                <section className='user-view' style={userCloseDisplay}>
                    <section className='user-display'>
                        <ul className='user-list'>
                            {mappedLoggedInUsers
                            ?<div>{mappedLoggedInUsers}</div>
                            :null
                            }
                        </ul>
                    </section>
                </section>
            </div>
            <div className={chatWindow}>
                <section className='open-close-chat' onClick={toggleChat}>
                    <ion-icon name="chatbubble" style={openDisplay}></ion-icon>
                    <div className='x-icon' style={closeDisplay}>X</div>
                </section> 
                <section className='chat-view' style={closeDisplay}>
                    <section className='send-chat'>
                        <input className='chat-input' maxLength='100' value={chatMessage} placeholder='100 Character Limit' onChange={e => setChatMessage(e.target.value)}/>
                        <button className='send-btn' onClick={send}><ion-icon name="send"></ion-icon></button>
                    </section>
                    <section className='chat-display'>
                        <ul className='messages-list'>
                            {mappedMessages
                            ?<div>{mappedMessages}</div>
                            :null
                            }
                            <div className='anchor'></div>
                        </ul>
                    </section>
                </section>
            </div>
        </div>
        
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Chat);