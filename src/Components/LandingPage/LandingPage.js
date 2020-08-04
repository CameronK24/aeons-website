import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

const LandingPage = props => {
    return (
        <div>
            {props.auth.loggedIn !== true
            ? 
                <div>
                    Landing Page
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