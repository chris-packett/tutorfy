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
      isLoggedIn: false,
      profile: {}
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
      this.checkProfile();
      this.setState({
        isLoggedIn: true
      })
    }
  }
  
  checkProfile() {
    const { userProfile, getProfile } = auth
    if (!userProfile) {
      getProfile((err, profile) => {
        console.log(profile)
        this.setState({
          profile
        });
      });
    }
    else {
      console.log(userProfile)
      this.setState({
        profile: userProfile
      });
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
    const { isLoggedIn, profile } = this.state

    return (
      <Router history={history}>
        <div className="app">
          <div className="top-container sticky-top">
            {/* https://imgur.com/0vd22AD */}
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
                <div className="d-flex justify-content-between align-items-center w-25">
                  <img src={profile.picture} className="top-container-profile-pic" alt="profile-pic" />
                  <button className="btn btn-outline-dark btn-sm" onClick={this.logout.bind(this)}>
                    Log Out
                  </button>
                </div>
              )
            }
          </div>
          <div className="app-component">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/dashboard" render={(props) => {
                return <Dashboard profile={profile} {...props} />
              }} />
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