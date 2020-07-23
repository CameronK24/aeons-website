import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/aeons-logo.png'
import './nav.css';

const Nav = props => {
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
                        <input />
                    </div>
                    <div className='pass-input'>
                        <p>Password:</p>
                        <input />
                    </div>
                </div>  
                <Link to='/home'><button className='auth-btn'>Login</button></Link>                    
                <Link to='/register'><button className='auth-btn' onClick={() => props.setRegisterFn(true)}>Register</button></Link>
            </section>
        </div>
    )
}

export default Nav;