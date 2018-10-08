import React, { Component } from 'react';

class AppointmentEducator extends Component {

    componentDidMount() {
        console.log(this.props.tutor.pictureURL)
    }

    render() {
        return (
            <div className="appointment-educator">
                <img src={this.props.tutor.pictureURL} alt="pic" id="profile-pic" />
                <h5 className="profile-name">{this.props.tutor.name}</h5>
                <img src="/assets/ratingsSample.png" alt="rating-pic" id="ratings-pic" />
            </div>
        );
    }
}

export default AppointmentEducator;
