import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
    render() {
        return (
        <nav>
          <label htmlFor="nav" className="nav-btn">
                <i></i>
                <i></i>
                <i></i>
          </label>
          <div className="nav-wrapper">
                <ul>
                      <li><a href="https://www.linkedin.com/in/chris-packett/">Home</a></li>
                      <li><a href="https://www.linkedin.com/in/chris-packett/">Schedule</a></li>
                      <li><a href="https://www.linkedin.com/in/chris-packett/">Settings</a></li>
                      <li><a href="https://www.linkedin.com/in/chris-packett/">Log Out</a></li>
                </ul>
          </div>
        </nav>
        );
    }
}

export default Menu;
