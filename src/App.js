import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

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
      profile: {}
    }
  }

  componentDidMount() {
    history.listen(() => {
      this.updateLoginState()
      // if (!Object.keys(this.state.profile).length) {
      //   this.checkProfile()
      // }
      this.checkProfile()
    })
    this.updateLoginState()
    this.checkProfile()
  }
  
  updateLoginState() {
    if (auth.isAuthenticated()) {
      this.setState({ isLoggedIn: true })
    }
  }

  checkProfile() {
    if (auth.isAuthenticated()) {
      const { userProfile, getProfile } = auth
      
      if (!userProfile) {
        // getProfile((err, profile) => this.createUser(profile));
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
  
  // createUser = (profile) => {
  //   console.log(profile)

  //   this.createUserAndUserTypeAsync(profile)
  //     .then(userAndUserTypeData => {
  //       console.log(userAndUserTypeData)
  //       this.setState({ profile });
  //     })
  // }

  // async createUserAndUserTypeAsync (profile) {
  //   const API_URL = "https://localhost:5001/api"

  //   const userType = localStorage.getItem('user_type');
  
  //   let userData = {
  //     "Name": profile['https://tutorfy:auth0:com/full_name'] || profile.given_name,
  //     "ZipCode": profile['https://tutorfy:auth0:com/zip_code'] || "",
  //     "IsStudent": (userType === 'student'),
  //     "IsTutor": (userType === 'tutor')
  //   }
  
  //   let userOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //       "Authorization": "Bearer " + auth.getAccessToken()
  //     },
  //     body: JSON.stringify(userData)
  //   }
  
  //   let userFetchResponse = await fetch(`${API_URL}/users/add`, userOptions)

  //   let userFetchData = await userFetchResponse.json()

  //   let userTypeData = {
  //     "Name": profile['https://tutorfy:auth0:com/full_name'] || profile.given_name,
  //     "ZipCode": profile['https://tutorfy:auth0:com/zip_code'] || "",
  //   }

  //   let userTypeOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //       "Authorization": "Bearer " + auth.getAccessToken()
  //     },
  //     body: JSON.stringify(userTypeData)
  //   }

  //   let userTypeFetchResponse = await fetch(`${API_URL}/${userType}s/add`, userTypeOptions)

  //   let userTypeFetchData = await userTypeFetchResponse.json()

  //   return {
  //     user: userFetchData,
  //     userType: userTypeFetchData
  //   }
  // }
    
  login() {
      auth.login()
  }

  logout() {
      auth.logout()
      this.setState({ isLoggedIn: false })
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