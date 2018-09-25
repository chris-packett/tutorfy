import React, { Component } from 'react';

class AppointmentPrice extends Component {
    render() {
        return (
            <div className="schedule-appointment-price">
                <h5>Session Price:</h5>
                <h5>$<span>{this.props.appointmentLength * this.props.priceRate}</span></h5>
            </div>
        );
    }
}

export default AppointmentPrice;
