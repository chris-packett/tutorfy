import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppointmentsPage from './components/Appointments/AppointmentsPage'
import Menu from './components/Menu'
import './App.css';

class App extends Component {
  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/https://localhost:5001/api/appointments')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <div className="top-container">
            <img src="/assets/logo-v2.png" alt="logo" id="logo"/>
          </div>
          <Menu />
          <div className="app-component">
            <Switch>
              <Route path="/appointment/add" exact component={AppointmentsPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
