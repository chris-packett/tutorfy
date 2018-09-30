import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history'
import AppointmentsPage from './components/Appointments/AppointmentsPage'
import Dashboard from './components/Dashboard/Dashboard'

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
      this.props.auth.login()
  }

  logout() {
      this.props.auth.logout()
  }
  render() {
    const { isAuthenticated } = this.props.auth

    return (
      <Router history={history} >
        <div className="app">
          <div className="top-container sticky-top">
            <img src="/assets/logo-v2.png" alt="logo" id="logo" />
            {
              !isAuthenticated() && (
                <button className="btn btn-outline-dark btn-sm auth-button" onClick={this.login.bind(this)}>
                  Log In
                </button>
              )
            }
            {
              isAuthenticated() && (
                <button className="btn btn-outline-dark btn-sm auth-button" onClick={this.logout.bind(this)}>
                  Log Out
                </button>
              )
            }
          </div>
          <div className="app-component">
            <Switch>
              <Route path="/appointment/add" exact component={AppointmentsPage} />
              <Route path="/dashboard" exact component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;