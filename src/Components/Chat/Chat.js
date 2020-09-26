import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {client} from '../../service/socket';
import './chat.css';

const Chat = props => {
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
            client.on('userConnected', (users, user) => {
                setLoggedInUsers(users);
                setNewMessage({
                    characterName: user.characterName,
                    message: 'has connected',
                    connectionEvent: true
                })
            })
        }
    }, [])

    useEffect(() => {
        if (client) {
            client.on('userDisconnected', (users, disconnectingUser) => {
                console.log(users);
                setLoggedInUsers(users);
                setNewMessage({
                    characterName: disconnectingUser.characterName,
                    message: 'has disconnected',
                    connectionEvent: true
                })
            })
        }
    }, [])

    useEffect(() => {
        if (newMessage.characterName) {
            setListMessages([...listMessages, newMessage]);
        }
    }, [newMessage]);

    useEffect(() => {
        if (listMessages !== []) {
            setMappedMessages(listMessages.map((element, index) => {
                if (element.connectionEvent) {
                    return (
                        <div className='connectionMessage' key={index}>
                            <li>
                                <span className='chat-username'>{element.characterName}</span>
                                <span className='message-display-2'>{element.message}</span>
                            </li>
                        </div>
                    )
                }

                else {
                    if (element.characterName === props.user.characterName) {
                        return (
                            <div className='myMessage' key={index}>
                                <li>
                                    <span className='chat-username'>Me:</span>
                                    <span className='message-display'>{element.message}</span>
                                </li>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className='notMyMessage' key={index}>
                                <li>
                                    <span className='chat-username'>{element.characterName}:</span>
                                    <span className='message-display'>{element.message}</span>
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
    }, [loggedInUsers]);

    const send = async () => {
        const combined = {
            characterName: props.user.characterName,
            message: chatMessage
        };
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

    const handleKeyDown = (keyPress) => {
        if(keyPress.key === 'Enter') {
            send();
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
                        <input className='chat-input' maxLength='100' value={chatMessage} placeholder='100 Character Limit' onKeyDown={e => handleKeyDown(e)} onChange={e => setChatMessage(e.target.value)}/>
                        <button className='send-btn' onClick={send}><ion-icon name="send"></ion-icon></button>
                    </section>
                    <section className='chat-display'>
                        <ul className='messages-list'>
                            {mappedMessages
                            ?<div className='messageFlex'>{mappedMessages}</div>
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