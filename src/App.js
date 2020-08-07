import React, { Component } from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './reset.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        {this.props.auth.register === false
        ? <div className='main-view'>
            <Nav />
            {this.props.auth.loggedIn === true
            ?
              <div className='page-view'>
                {routes}
              </div>
            : 
              <div className='page-view'>
                <Redirect to='/' />
                {routes}
              </div>
            }
          </div>
        : <div>
            {routes}
          </div>
        }
        
      </div>
    );
  }  
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
