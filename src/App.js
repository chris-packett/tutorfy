import React, { Component } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Components/Home/Home'
import Dashboard from './Components/Dashboard/Dashboard'
import ProfilePage from './Components/Profile/ProfilePage'
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
      isHomePage: false,
      profile: {}
    }
  }

  login() {
      auth.login()
  }

  logout() {
      auth.logout()
      this.setState({ isLoggedIn: false })
  }

  componentDidMount() {
    history.listen(() => {
      this.updateLoginState()
      this.updateHomePageState()
      this.checkProfile()
    })
    this.updateLoginState()
    this.updateHomePageState()
    this.checkProfile()
  }
  
  updateLoginState() {
    if (auth.isAuthenticated()) {
      this.setState({ isLoggedIn: true })
    }
  }

  updateHomePageState() {
    if (window.location.pathname.length === 1) {
      this.setState({ isHomePage: true })
    }
    else {
      this.setState({ isHomePage: false })
    }
  }

  checkProfile() {
    if (auth.isAuthenticated()) {
      const { userProfile, getProfile } = auth
      
      if (!userProfile) {
        getProfile((err, profile) => {
          console.log(profile)
          this.setState({ profile })
        })
      }
      else {
        console.log(userProfile)
        this.setState({ profile: userProfile });
      }
    }
  }
    
  render() {
    const { isLoggedIn, isHomePage, profile } = this.state

    return (
      <Router history={history}>
        <div className="app">
          {
            !isHomePage && (
              <div className="top-container sticky-top">
                {/* https://imgur.com/0vd22AD */}
                <Link to="/dashboard"><img src="/assets/logo-v2.png" alt="logo" id="logo" /></Link>
                {
                  !isLoggedIn && (
                    <button className="btn btn-outline-dark btn-sm" onClick={this.login.bind(this)}>
                      Log In
                    </button>
                  )
                }
                {
                  isLoggedIn && (
                    <div className="top-container-pic-and-button-container">
                      <img src={profile.picture} alt="profile-pic" className="top-container-profile-pic"/>
                      <button className="btn btn-outline-dark btn-sm top-container-button" onClick={this.logout.bind(this)}>
                        Log Out
                      </button>
                    </div>
                  )
                }
              </div>
            )
          }
          <div className="app-component">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/dashboard" render={(props) => {
                return <Dashboard profile={profile} {...props} />
              }} />
              <Route path="/profile/:id" exact component={ProfilePage} />
              <Route path="/appointment/add/tutor/:id" exact component={AppointmentsPage} />
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