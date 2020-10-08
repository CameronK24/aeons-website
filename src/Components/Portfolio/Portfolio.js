import { PresignedPost } from 'aws-sdk/clients/s3';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {changeNavColor, changeBtnColor} from '../../redux/portfolioReducer';
import './portfolio.css'

const Portfolio = props => {
    useEffect(() => {
        props.changeNavColor('nav-bar-color-2');
        props.changeBtnColor('auth-btn-2');
    }, [])

    return (
        <div className='portfolio-page'>
            {props.auth.loggedIn !== true
            ?
                <div className='portfolio-view'>
                    <h1 className='portfolio-header'>Cameron Kelly's Portfolio</h1>
                </div>
            : <Redirect to='/home'/>
            } 
        </div>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, {changeNavColor, changeBtnColor})(Portfolio);