import React, { useState, useEffect } from 'react';
import {Link, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser, loginUser, notRegisteringUser} from '../../redux/authReducer';
import {storeUserInfo} from '../../redux/userReducer';

import axios from 'axios';
import './register.css';

const Register = props => {
    const [characterFirst, setCharacterFirst] = useState('');
    const [characterLast, setCharacterLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [checkPasswords, setCheckPasswords] = useState('');
    const [disableRegister, setDisableRegister] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (characterFirst && characterLast && email && password && verifyPassword) {
            if (password === verifyPassword) {
                setDisableRegister(false);
            }
        }
        else {
            setDisableRegister(true);
        }
    }, [characterFirst, characterLast, email, password, verifyPassword]);

    useEffect(() => {
        if (password === verifyPassword) {
            setCheckPasswords('');
        }
        else {
            setCheckPasswords('Passwords do not match');
        }
    }, [verifyPassword]);

    const loginUser = async () => {
        const body = {characterFirst, characterLast, email, password}
        await axios.post('/auth/register', body)
            .then(res => {
                const {user_id, email, name, avatar, portrait} = res.data;
                props.storeUserInfo(user_id, email, name, avatar, portrait);
                alert('Thank you for registering. Now logging in.');
                setIsRegistered(true);
                props.loginUser();
                props.notRegisteringUser();
            })
            .catch(err => {
                alert(err.response.request.response);
            })
    }

    return (
        <Switch>
            {isRegistered !== true
                ? (
                    <div className='register-box'>
                        <h1>Register</h1>
                        <section className='character-auth'>
                            <p>Character First:</p>
                            <input value={characterFirst} onChange={e => setCharacterFirst(e.target.value)} />
                        </section>
                        <section className='character-auth'>
                            <p>Character Last:</p>
                            <input value={characterLast} onChange={e => setCharacterLast(e.target.value)} />
                        </section>
                        <section className='email-auth'>
                            <p>Email:</p>
                            <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
                        </section>
                        <section className='pass-auth'>
                            <p>Password:</p>
                            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                        </section>
                        <section className='pass-auth'>
                            <p>Verify Password:</p>
                            <input type='password' value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} />
                        </section>
                        <p className='password-check'>{checkPasswords}</p>
                        <section className='register-btns'>
                            <Link to='/'><button onClick={() => props.notRegisteringUser()} >Cancel</button></Link>
                            <button className='register' disabled={disableRegister} onClick={loginUser} >Register</button>
                        </section>
                    </div>
                )
                : (
                    <Redirect to='/home' />
                )
            }
            
        </Switch>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        user: state.user
    };
}

export default connect(mapStateToProps, {registerUser, storeUserInfo, loginUser, notRegisteringUser})(Register);