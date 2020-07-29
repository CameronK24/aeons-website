import React, { Component } from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import {connect} from 'react-redux';
import './reset.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        {this.props.auth.register === false
        ? <div className='main-view'>
            <Nav />
            <div className='page-view'>
              {routes}
            </div>
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
