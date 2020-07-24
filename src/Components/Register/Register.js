import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../redux/reducer';
import './register.css';

const Register = props => {
    return (
        <div className='register-box'>
            <h1>Register</h1>
            <section className='character-auth'>
                <p>Character Name:</p>
                <input />
            </section>
            <section className='email-auth'>
                <p>Email:</p>
                <input />
            </section>
            <section className='pass-auth'>
                <p>Password:</p>
                <input />
            </section>
            <section className='pass-auth'>
                <p>Verify Password:</p>
                <input />
            </section>
            <section className='register-btns'>
                <Link to='/'><button onClick={() => props.registerUser(false)} >Cancel</button></Link>
                <input type='submit' value='Register' disabled={true} />
            </section>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        register: state.register
    };
}

export default connect(mapStateToProps, {registerUser})(Register);