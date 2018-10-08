import React, { Component } from 'react';

class AppointmentEducator extends Component {
    render() {
        return (
            <div className="appointment-educator">
                {/* add dynamic image */}
                <img src="/assets/linkedinpic.jpg" alt="pic" id="profile-pic" />
                <h5 className="profile-name">{this.props.tutor.name}</h5>
                <img src="/assets/ratingsSample.png" alt="rating-pic" id="ratings-pic" />
            </div>
        );
    }
}

export default AppointmentEducator;
