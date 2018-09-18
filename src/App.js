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
        <h5 className="profile-name">Chris Packett</h5>
        <img src="/assets/ratingsSample.png" alt="rating-pic" id="ratings-pic" />
        <button className="schedule-appointment-button">Schedule</button>
      </div>
    );
  }
}

export default App;
