import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history'
import Home from './Components/Home/Home'
import Dashboard from './Components/Dashboard/Dashboard'
import AppointmentsPage from './Components/Appointments/AppointmentsPage'
import './App.css';

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
      <Router history={history}>
        <div className="app">
          <div className="top-container sticky-top">
            <img src="/assets/logo-v2.png" alt="logo" id="logo" />
            {
              !isAuthenticated() && (
                <button className="btn btn-outline-dark btn-sm" onClick={this.login.bind(this)}>
                  Log In
                </button>
              )
            }
            {
              isAuthenticated() && (
                <button className="btn btn-outline-dark btn-sm" onClick={this.logout.bind(this)}>
                  Log Out
                </button>
              )
            }
          </div>
          <div className="app-component">
            <Switch>
              <Route path="/home" exact render={(props) => <Home auth={this.props.auth} {...props} />} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/appointment/add" exact component={AppointmentsPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;