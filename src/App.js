import React, { Component } from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Chat from './Components/Chat/Chat';
import './reset.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    document.body.style.backgroundImage = this.props.portfolio.backgroundImage;
  }

  componentDidUpdate() {
    document.body.style.backgroundImage = this.props.portfolio.backgroundImage;
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = null;
  }

  render() {
    return (
      <div>
        {this.props.auth.register === false
        ? <div className='main-view'>
            <Nav />
            {this.props.auth.loggedIn === true
            ?
              <div className='page-view'>
                <Chat />
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
    auth: state.auth,
    portfolio: state.portfolio
  };
}

export default connect(mapStateToProps)(App);
