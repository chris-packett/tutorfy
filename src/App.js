import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from "./history"
import Auth from './Auth/Auth'
import Menu from './components/Menu'
import Home from './components/Home/Home'
import AppointmentsPage from './components/Appointments/AppointmentsPage'
import Dashboard from './components/Dashboard/Dashboard'
import './App.css';

const auth = new Auth();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="app">
          <div className="top-container sticky-top mb-4">
            <img src="/assets/logo-v2.png" alt="logo" id="logo" />
          </div>
          <Menu />
          <div className="app-component">
            <Switch>
              <Route path="/home" exact render={(props) => <Home auth={auth} {...props} />} />
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
