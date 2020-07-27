import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser, storeUserInfo} from '../../redux/reducer';
import axios from 'axios';
import logo from '../../images/aeons-logo.png'
import './nav.css';

const Nav = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = () => {
        const body = {email, password}
        axios.post('/auth/login', body)
            .then(res => {
                const {user_id, email, name, avatar, portrait} = res.data;
                props.storeUserInfo(user_id, email, name, avatar, portrait);
                alert('Logged In');
            })
            .catch(err => {
                setPassword('');
                alert(err.response.request.response);
            })
    }

    return (
        <div className='nav-bar'>
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
                        <input value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='pass-input'>
                        <p>Password:</p>
                        <input value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>  
                <Link to='/home'><button className='auth-btn' onClick={loginUser}>Login</button></Link>                    
                <Link to='/register'><button className='auth-btn' onClick={() => props.registerUser(true)} >Register</button></Link>
            </section>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        email: state.email,
        characterName: state.characterName,
        avatar: state.avatar,
        portrait: state.portrait,
        register: state.register
    };
}

export default connect(mapStateToProps, {registerUser, storeUserInfo})(Nav);