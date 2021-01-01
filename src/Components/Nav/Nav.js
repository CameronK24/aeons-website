import React, { useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser, loginUser, notRegisteringUser, logoutUser} from '../../redux/authReducer';
import {storeUserInfo} from '../../redux/userReducer';
import {changeNavColor, changeBtnColor, changeSideColor, changeBackgroundImage} from '../../redux/portfolioReducer';
import {client} from '../../service/socket';
import axios from 'axios';
import logo from '../../images/aeons-logo.png'
import './nav.css';

const Nav = props => {

    useEffect(() => {
        axios.get('/api/auth/me')
            .then(res => {
                console.log(res.data);
                if (res.data === 'OK') {
                    //Do Nothing
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
                setEmail('');
                setPassword('');                
            })
            .catch(err => {
                setPassword('');
                alert(err.response.request.response);
            })
        if (client.connected === false) {
            client.connect();
        }
    }

    const logoutUser = async () => {
        await axios.post('/auth/logout')
            .then(() => {
                props.logoutUser();      
                props.notRegisteringUser();
            })
            .catch(err => console.log(err));
            if (mobileNav === true) {
                toggleMobileNav();
            }
        client.disconnect();
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

    const changeNavColorClick = () => {
        props.changeNavColor('nav-bar-color-1');
        props.changeBtnColor('auth-btn');
        props.changeSideColor('side-profile-color-1');
        props.changeBackgroundImage("url('https://i.pinimg.com/originals/a0/de/1d/a0de1dd5d13217683f21e4e525193069.jpg')")
    }

    return (
            <div className='site-nav'>
                {props.auth.loggedIn === false
                    ? (
                        <div className={`nav-bar-1 ${props.portfolio.navBarColor}`}>
                            <div className='nav-bar-content'>
                                <Link to='/' className='logo-section' onClick={changeNavColorClick}>
                                    <img src={logo} alt='logo' />
                                    <h1>Order of Bahamut</h1>
                                </Link>
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
                                    <button className={props.portfolio.buttonColor} onClick={loginUser}>Login</button>                
                                    <Link onClick={changeNavColorClick} to='/register'><button className={props.portfolio.buttonColor} onClick={() => props.registerUser()} >Register</button></Link>
                                </section>
                                <section className='auth-box-mobile'>
                                    <button className={`${props.portfolio.buttonColor} auth-btn mobile-login`} onClick={toggleMobileLogin}>Login</button>                
                                    <Link to='/register'><button className={props.portfolio.buttonColor} onClick={() => props.registerUser()} >Register</button></Link>           
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
                            <div className={`nav-bar-2 ${props.portfolio.navBarColor}`}>
                                <section className='nav-bar-content'>
                                    <Link to='/home' onClick={changeNavColorClick} className='logo-section logo-section-2'>
                                        <img src={logo} alt='logo' />
                                        <h1>Order of Bahamut</h1>
                                    </Link>
                                    <section className='nav-area nav-area-2'>
                                        <Link to='/home' onClick={changeNavColorClick}><button className='nav-btn'>Home</button></Link>
                                        <Link to='/members' onClick={changeNavColorClick}><button className='nav-btn'>Members</button></Link>
                                        <Link to='/events' onClick={changeNavColorClick}><button className='nav-btn'>Events</button></Link>
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
                                        <Link to='/' onClick={changeNavColorClick}><button className={props.portfolio.buttonColor} onClick={logoutUser}>Logout</button></Link>
                                    </section>
                                </section>
                            </div>
                            <section className={`side-profile ${props.portfolio.sideProfileColor}`}>
                                <section className='character-small-profile'>
                                    <Link to={`/profile/${props.user.userId}`} onClick={changeNavColorClick}><img src={props.user.avatar} alt='avatar' />
                                    <h3>{props.user.characterName} </h3></Link>
                                </section>
                                <section className='new-content'>
                                    <Link to='/post/new-post' onClick={changeNavColorClick}><ion-icon name='newspaper-outline'></ion-icon>
                                    <p>New Post</p></Link>
                                    <Link to='/events/new-event' onClick={changeNavColorClick}><ion-icon name="calendar-outline"></ion-icon>
                                    <p>New Event</p></Link>
                                </section>
                                <section className='version'>
                                    <Link to='/portfolio'><p className='portfolio-nav-link'>Portfolio</p></Link>
                                    <p>Version 1.2.0</p>
                                    <p>Designed and built by: Cameron Kelly</p>
                                    <p>Contact: cskelly15@gmail.com</p>
                                    <p>Images property of Square Enix©</p>
                                </section>
                            </section>
                            {mobileNav === true
                            ? 
                                <section className={mobileMenuClass + ' ' + props.portfolio.navBarColor}>
                                    <ul className='mobile-nav-list'>
                                        <Link to='/home' onClick={changeNavColorClick}><li className='nav-btn' onClick={toggleMobileNav}>Home</li></Link>
                                        <Link to='/members' onClick={changeNavColorClick}><li className='nav-btn' onClick={toggleMobileNav}>Members</li></Link>
                                        <Link to='/events' onClick={changeNavColorClick}><li className='nav-btn' onClick={toggleMobileNav}>Events</li></Link>
                                        <Link to='/post/new-post' onClick={changeNavColorClick}><li className='nav-btn' onClick={toggleMobileNav}>New Post</li></Link>
                                        <Link to='/events/new-event' onClick={changeNavColorClick}><li className='nav-btn' onClick={toggleMobileNav}>New Event</li></Link>
                                        <Link to={`/profile/${props.user.userId}`} onClick={changeNavColorClick}><li className='nav-btn' onClick={toggleMobileNav}>Profile</li></Link>
                                        <Link to='/portfolio' onClick={changeNavColorClick}><li className='nav-btn' onClick={toggleMobileNav}>Portfolio</li></Link>
                                        <Link to='/' onClick={changeNavColorClick}><li className='auth-btn' onClick={logoutUser}>Logout</li></Link>
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
        user: state.user,
        portfolio: state.portfolio
    };
}

export default connect(mapStateToProps, {registerUser, storeUserInfo, loginUser, notRegisteringUser, logoutUser, changeNavColor, changeBtnColor, changeSideColor, changeBackgroundImage})(withRouter(Nav));