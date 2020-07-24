import React, { Component } from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import {connect} from 'react-redux';
import {registerUser} from './redux/reducer';
import './reset.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        {this.props.register === false
        ? <div>
            <Nav />
            {routes}
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
    register: state.register
  };
}

export default connect(mapStateToProps, {registerUser})(App);
