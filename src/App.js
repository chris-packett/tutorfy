import React, { Component } from 'react';
import BackgroundSVG from './components/BackgroundSVG'
import Menu from './components/Menu'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="svg-container" id="background-svg">
        <BackgroundSVG />
        <img src="/assets/logo.png" alt="logo" id="logo"/>
        <Menu />
        <h2 className="create-appointment">Create Appointment</h2>
        <img src="/assets/linkedinpic.jpg" alt="pic" id="profile-pic" />
      </div>
    );
  }
}

export default App;
