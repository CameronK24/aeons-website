import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import {changeNavColor, changeBtnColor, changeSideColor, changeBackgroundImage} from '../../redux/portfolioReducer';
import './landingPage.css';

const LandingPage = props => {

    useEffect(() => {
        props.changeNavColor('nav-bar-color-1');
        props.changeBtnColor('auth-btn');
        props.changeSideColor('side-profile-color-1');
        props.changeBackgroundImage('https://i.pinimg.com/originals/a0/de/1d/a0de1dd5d13217683f21e4e525193069.jpg')
    }, [])

    return (
        <div>
            {props.auth.loggedIn !== true
            ? 
                <div className='landing-view'>
                    <h1>WELCOME TO THE ORDER OF BAHAMUT FREE COMPANY WEBSITE</h1>
                    <img className='site-banner' src='https://aeons-s3-storage9.s3-us-west-1.amazonaws.com/58b5a690-484f-47b8-994a-7cfa4fad2be9-ffxiv_08062020_230528_069.png' alt='Site Banner' />                    
                    <p className='fc-bio'>We are one of the oldest Free Companies on Mateus. Founded by Fiala Gaian and currently lead by Blackest Blue.</p>
                    <p className='fc-register-info'>If you are currently a member of our Free Company and have not registered yet please click the Register button at the top. If you are not a member of our Free Company and would like to be, look us up in game and submit an application in game. We take all kinds of people!</p>
                    <p className='created-by' >Created by Cameron Kelly - <Link className='portfolio-link' to='/portfolio'>Portfolio</Link></p>
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

export default connect(mapStateToProps, {changeNavColor, changeBtnColor, changeSideColor, changeBackgroundImage})(LandingPage);