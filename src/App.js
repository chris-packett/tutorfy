import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Home/Home'
import Dashboard from './Components/Dashboard/Dashboard'
import AppointmentsPage from './Components/Appointments/AppointmentsPage'

import Callback from './Callback/Callback'
import Auth from './Auth/Auth'
import history from './history'

import './App.css';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    history.listen(() => {
      this.checkAuth()
    })
    this.checkAuth()
  }
  
  checkAuth() {
    if (auth.isAuthenticated()) {
      this.setState({
        isLoggedIn: true
      })
    }
  }
  
  login() {
      auth.login()
  }

  logout() {
      auth.logout()
      this.setState({
        isLoggedIn: false
      })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn

    return (
      <Router history={history}>
        <div className="app">
          <div className="top-container sticky-top">
            <img src="/assets/logo-v2.png" alt="logo" id="logo" />
            {
              !isLoggedIn && (
                <button className="btn btn-outline-dark btn-sm" onClick={this.login.bind(this)}>
                  Log In
                </button>
              )
            }
            {
              isLoggedIn && (
                <button className="btn btn-outline-dark btn-sm" onClick={this.logout.bind(this)}>
                  Log Out
                </button>
              )
            }
          </div>
          <div className="app-component">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/appointment/add" exact component={AppointmentsPage} />
              <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} /> 
              }}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;