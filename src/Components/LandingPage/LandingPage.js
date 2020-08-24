import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import './landingPage.css';

const LandingPage = props => {
    return (
        <div>
            {props.auth.loggedIn !== true
            ? 
                <div className='landing-view'>
                    <h1>WELCOME TO THE ORDER OF BAHAMUT FREE COMPANY WEBSITE</h1>
                    <img className='site-banner' src='https://aeons-s3-storage9.s3-us-west-1.amazonaws.com/58b5a690-484f-47b8-994a-7cfa4fad2be9-ffxiv_08062020_230528_069.png' alt='Site Banner' />                    
                    <p className='fc-bio'>We are one of the oldest Free Companies on Mateus. Founded by Fiala Gaian and currently lead by Blackest Blue.</p>
                    <p className='fc-register-info'>If you are currently a member of our Free Company and have not registered yet please click the Register button at the top. If you are not a member of our Free Company and would like to be, look us up in game and Submit an application. We take all kinds of people!</p>
                </div>
            : <Redirect to='/home' />
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(LandingPage);