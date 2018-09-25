import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from "./history"
import AppointmentsPage from './components/Appointments/AppointmentsPage'
import Dashboard from './components/Dashboard/Dashboard'
import Menu from './components/Menu'
import './App.css';

class App extends Component {
  componentDidMount() {
    fetch('https://localhost:5001/api/appointments')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
  }

  render() {
    return (
      <Router history={history}>
        <div className="app">
          <div className="top-container">
            <img src="/assets/logo-v2.png" alt="logo" id="logo"/>
          </div>
          <Menu />
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
