import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser, storeUserInfo} from '../../redux/reducer';
import './register.css';

const Register = props => {
    const [characterFirst, setCharacterFirst] = useState('');
    const [characterLast, setCharacterLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [checkPasswords, setCheckPasswords] = useState('');
    const [disableRegister, setDisableRegister] = useState(true);

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

    const loginUser = () => {
        const body = {characterFirst, characterLast, email, password}
        axios.post('/auth/register', body)
            .then(res => {
                const {user_id, email, name, avatar, portrait} = res.data;
                props.storeUserInfo(user_id, email, name, avatar, portrait);
                alert('Thank you for registering. Now logging in.');
            })
            .catch(err => {
                alert(err.response.request.response);
            })
    }

    return (
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
                <input value={email} onChange={e => setEmail(e.target.value)} />
            </section>
            <section className='pass-auth'>
                <p>Password:</p>
                <input value={password} onChange={e => setPassword(e.target.value)} />
            </section>
            <section className='pass-auth'>
                <p>Verify Password:</p>
                <input value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} />
            </section>
            <p className='password-check'>{checkPasswords}</p>
            <section className='register-btns'>
                <Link to='/'><button onClick={() => props.registerUser(false)} >Cancel</button></Link>
                <button className='register' disabled={disableRegister} >Register</button>
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

export default connect(mapStateToProps, {registerUser, storeUserInfo})(Register);