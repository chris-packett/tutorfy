import React, { Component } from 'react';

class AppointmentEducator extends Component {
    render() {
        return (
            <div className="appointment-educator">
                <img 
                    className="appointment-educator-profile-pic"
                    src={this.props.tutor.pictureURL} 
                    alt="tutor-profile-pic"  
                />
                <h5 
                    className="appointment-educator-profile-name">
                    {this.props.tutor.name}
                </h5>
                <img 
                    className="appointment-educator-ratings-pic"
                    src="/assets/ratingsSample.png" 
                    alt="rating-pic"  
                />
            </div>
        );
    }
}

export default AppointmentEducator;
