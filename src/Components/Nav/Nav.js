import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser, loginUser, notRegisteringUser, logoutUser} from '../../redux/authReducer';
import {storeUserInfo} from '../../redux/userReducer';
import axios from 'axios';
import logo from '../../images/aeons-logo.png'
import './nav.css';

const Nav = props => {

    useEffect(() => {
        axios.get('/api/auth/me')
            .then(res => {
                console.log(res.data);
                if (res.data === 'OK') {

                }
                else {
                    const {user_id, email, name, avatar, portrait} = res.data;
                    props.loginUser();      
                    props.notRegisteringUser(); 
                    props.storeUserInfo(user_id, email, name, avatar, portrait);
                    setEmail('');
                    setPassword('');
                }             
            })
            .catch(err => {
                setPassword('');
                alert(err.response.request.response);
            })
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileLogin, setMobileLogin] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const [mobileMenuClass, setMobileMenuClass] = useState('mobile-nav-menu');

    const loginUser = async () => {
        const body = {email, password}
        await axios.post('/auth/login', body)
            .then(res => {
                const {user_id, email, name, avatar, portrait} = res.data;
                props.loginUser();      
                props.notRegisteringUser(); 
                props.storeUserInfo(user_id, email, name, avatar, portrait);
                // alert('Logged In'); 
                setEmail('');
                setPassword('');                
            })
            .catch(err => {
                setPassword('');
                alert(err.response.request.response);
            })
    }

    const logoutUser = () => {
        axios.post('/auth/logout')
            .then(() => {
                props.logoutUser();      
                props.notRegisteringUser();
            })
            .catch(err => console.log(err));
    }

    const toggleMobileLogin = () => {
        setMobileLogin(!mobileLogin);
    }

    const toggleMobileNav = () => {
        setMobileNav(!mobileNav);
        if (mobileMenuClass === 'mobile-nav-menu') {
            setMobileMenuClass('mobile-nav-menu-2');
        }
        else {
            setMobileMenuClass('mobile-nav-menu');
        }
    }

    return (
        <div className='site-nav'>
            {props.auth.loggedIn === false
                ? (
                    <div className='nav-bar-1'>
                        <div className='nav-bar-content'>
                            <section className='logo-section'>
                                <img src={logo} alt='logo' />
                                <h1>Order of Bahamut</h1>
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
                            <section className='auth-box-mobile'>   
                                <button className='auth-btn mobile-login' onClick={toggleMobileLogin}>Login</button>                
                                <Link to='/register'><button className='auth-btn' onClick={() => props.registerUser()} >Register</button></Link>           
                            </section>
                        </div>
                        {mobileLogin === true
                                ?
                                    <div className='mobile-login-box'>
                                        <div className='auth-input'>
                                            <div className='email-input'>
                                                <p>Email:</p>
                                                <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
                                            </div>
                                            <div className='pass-input'>
                                                <p>Password:</p>
                                                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                                            </div>
                                            <button className='auth-btn mobile-login' onClick={loginUser}>Login</button>
                                        </div>
                                    </div>
                                : null
                                }
                    </div>
                )
                : (
                    <div>
                        <div className='nav-bar-2'>
                            <section className='nav-bar-content'>
                                <section className='logo-section logo-section-2'>
                                    <img src={logo} alt='logo' />
                                    <h1>Order of Bahamut</h1>
                                </section>
                                <section className='nav-area nav-area-2'>
                                    <Link to='/home'><button className='nav-btn'>Home</button></Link>
                                    <Link to='/members'><button className='nav-btn'>Members</button></Link>
                                    <Link to='/events'><button className='nav-btn'>Events</button></Link>
                                </section>
                                <section className='mobile-nav-button' onClick={toggleMobileNav}>
                                    <div className='mobile-menu-graphic'>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <button className='nav-btn'>Menu</button>
                                </section>
                                <section className='logout-section'>
                                    <Link to='/'><button className='auth-btn' onClick={logoutUser}>Logout</button></Link>
                                </section>
                            </section>
                        </div>
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
                            <section className='version'>
                                <p>Version 1.1.4</p>
                                <p>Contact: cskelly15@gmail.com</p>
                                <p>Images property of Square Enix©</p>
                            </section>
                        </section>
                        {mobileNav === true
                        ? 
                            <section className={mobileMenuClass}>
                                <ul className='mobile-nav-list'>
                                    <Link to='/home'><li className='nav-btn' onClick={toggleMobileNav}>Home</li></Link>
                                    <Link to='/members'><li className='nav-btn' onClick={toggleMobileNav}>Members</li></Link>
                                    <Link to='/events'><li className='nav-btn' onClick={toggleMobileNav}>Events</li></Link>
                                    <Link to='/post/new-post'><li className='nav-btn' onClick={toggleMobileNav}>New Post</li></Link>
                                    <Link to='/events/new-event'><li className='nav-btn' onClick={toggleMobileNav}>New Event</li></Link>
                                    <Link to={`/profile/${props.user.userId}`}><li className='nav-btn' onClick={toggleMobileNav}>Profile</li></Link>
                                    <Link to='/'><li className='auth-btn' onClick={logoutUser}>Logout</li></Link>
                                </ul>
                            </section>
                        : null
                        }
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