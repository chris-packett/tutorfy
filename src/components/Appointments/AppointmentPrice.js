import React, { Component } from 'react';

class AppointmentPrice extends Component {
    render() {
        let priceRate;

        if (!this.props.priceRate) {
            priceRate = 0
        }
        else {
            priceRate = this.props.priceRate
        }
        
        return (
            <div className="schedule-appointment-price">
                <h5>Session Price:</h5>
                <h5>$<span>{this.props.appointmentLength * priceRate}</span></h5>
            </div>
        );
    }
}

export default AppointmentPrice;
