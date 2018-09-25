import React, { Component } from 'react';

class AppointmentCard extends Component {
    render() {
        return (
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <div className="card-title text-center">
                        <h5>{this.props.appointment.location}</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppointmentCard;
