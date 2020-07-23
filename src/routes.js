import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Register from './Components/Register/Register';
import Events from './Components/Events/Events';
import Home from './Components/Home/Home';
import LandingPage from './Components/LandingPage/LandingPage';
import Profile from './Components/Profile/Profile';
import Post from './Components/Post/Post';
import Members from './Components/Members/Members';

export default (
    <Switch>
        <Route component={LandingPage} exact path='/' />
        <Route component={Home} path='/home' />
        <Route component={Register} path='/register' />
        <Route component={Events} path='/events' />
        <Route component={Members} path='/members' />
        <Route component={Profile} path='/profile/:profileid' />
        <Route component={Post} path='/post/:postid' />
    </Switch>
);