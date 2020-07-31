import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser, loginUser, notRegisteringUser, logoutUser} from '../../redux/authReducer';
import {storeUserInfo} from '../../redux/userReducer';
import axios from 'axios';
import logo from '../../images/aeons-logo.png'
import './nav.css';

const Nav = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        const body = {email, password}
        await axios.post('/auth/login', body)
            .then(res => {
                const {user_id, email, name, avatar, portrait} = res.data;
                props.loginUser();      
                props.notRegisteringUser(); 
                props.storeUserInfo(user_id, email, name, avatar, portrait);
                alert('Logged In'); 
                setEmail('');
                setPassword('');                
            })
            .catch(err => {
                setPassword('');
                alert(err.response.request.response);
            })
    }

    const logoutUser = () => {
        props.logoutUser();      
        props.notRegisteringUser();
    }

    return (
        <div className='site-nav'>
            {props.auth.loggedIn === false
                ? (
                    <div className='nav-bar-1'>
                        <section className='logo-section'>
                            <img src={logo} alt='logo' />
                            <h1>Order of Bahamut</h1>
                        </section>
                        <section className='nav-area'>
                            <Link to='/'><button>Landing Page</button></Link>
                            <Link to='/home'><button>Home</button></Link>
                            <Link to='/members'><button>Members</button></Link>
                            <Link to='/events'><button>Events</button></Link>
                        </section>
                        <section className='auth-box'>   
                            <div className='auth-input'>
                                <div className='email-input'>
                                    <p>Email:</p>
                                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className='pass-input'>
                                    <p>Password:</p>
                                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>  
                            <button className='auth-btn' onClick={loginUser}>Login</button>                
                            <Link to='/register'><button className='auth-btn' onClick={() => props.registerUser()} >Register</button></Link>
                        </section>
                    </div>
                )
                : (
                    <div>
                        <section className='nav-bar-2'>
                            <section className='logo-section logo-section-2'>
                                <img src={logo} alt='logo' />
                                <h1>Order of Bahamut</h1>
                            </section>
                            <section className='nav-area nav-area-2'>
                                <Link to='/home'><button>Home</button></Link>
                                <Link to='/members'><button>Members</button></Link>
                                <Link to='/events'><button>Events</button></Link>
                            </section>
                            <section className='logout-section'>
                                <Link to='/'><button className='auth-btn' onClick={logoutUser}>Logout</button></Link>
                            </section>
                        </section>
                        <section className='side-profile'>
                            <section className='character-small-profile'>
                                <Link to={`/profile/${props.user.userId}`}><img src={props.user.avatar} alt='avatar' />
                                <h3>{props.user.characterName} </h3></Link>
                            </section>
                            <section className='new-content'>
                                <Link to='/post/new-post'><ion-icon name='newspaper-outline'></ion-icon>
                                <p>New Post</p></Link>
                                <Link to='/events/new-event'><ion-icon name="calendar-outline"></ion-icon>
                                <p>New Event</p></Link>
                            </section>
                        </section>
                    </div>
                )
            }
       </div>     
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        user: state.user
    };
}

export default connect(mapStateToProps, {registerUser, storeUserInfo, loginUser, notRegisteringUser, logoutUser})(Nav);