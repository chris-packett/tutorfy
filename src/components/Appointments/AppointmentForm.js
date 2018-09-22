import React, { Component } from 'react';

class AppointmentForm extends Component {
    render() {
        return (
            <div>
                <label>
                    Date:
                    <input type="text" placeholder="Date"/>
                </label>
            </div>
        );
    }
}

export default AppointmentForm;
