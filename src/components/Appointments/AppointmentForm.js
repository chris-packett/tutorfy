import React, { Component } from 'react';

class AppointmentForm extends Component {
    render() {
        return (
            <form className="appointment-form">
                <label>
                    Date:
                    <input type="date"/>
                </label>
                <label>
                    Start Time:
                    <input type="time"/>
                </label>
                <label>
                    How long?
                    <input type='range' min='0' max='5' step='.5'/>
                </label>
                <label>
                    Location:
                    <input type="text" />
                </label>
            </form>
        );
    }
}

export default AppointmentForm;
