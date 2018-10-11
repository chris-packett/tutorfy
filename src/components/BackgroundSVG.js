import React, { Component } from 'react';

class BackgroundSVG extends Component {
    render() {
        return (
        <svg width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none" className="svg-unit">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="start" />
              <stop offset="100%" className="end" />
            </linearGradient>
          </defs>
          <polygon points="0,0 100,0 100,30 50,50 0,30" className="polygon-unit"/>
        </svg>
        );
    }
}

export default BackgroundSVG;
