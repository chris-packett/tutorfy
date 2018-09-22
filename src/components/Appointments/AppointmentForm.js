import React, { Component } from 'react';

class AppointmentForm extends Component {
    render() {
        return (
            <div className="appointment-form-container">
                <form className="appointment-form">
                    <label>
                        Date:
                        <input type="date" />
                    </label>
                    <label>
                        Start Time:
                        <input type="time" />
                    </label>
                    <label>
                        How long?
                        <input type="range" min="0" max="5" step=".5" />
                    </label>
                    <label>
                        Location:
                        <input type="text" />
                    </label>
                    <button className="schedule-appointment-button">Schedule</button>
                </form>
            </div>
        );
    }
}

export default AppointmentForm;
