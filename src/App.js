import React, { Component } from 'react';
import AppointmentsPage from './components/Appointments/AppointmentsPage'
import Menu from './components/Menu'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="top-container">
          <img src="/assets/logo-v2.png" alt="logo" id="logo"/>
        </div>
        <Menu />
        <AppointmentsPage />
      </div>
    );
  }
}

export default App;
