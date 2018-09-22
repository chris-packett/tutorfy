import React, { Component } from 'react';
import AppointmentEducator from './AppointmentEducator'
import AppointmentForm from './AppointmentForm'
import AppointmentPrice from './AppointmentPrice'
import AppointmentHeader from './AppointmentHeader'

class AppointmentsPage extends Component {
    render() {
        return (
            <div className="appointments-page">
                <AppointmentHeader />
                <AppointmentEducator />
                <AppointmentPrice />
                <AppointmentForm />
            </div>
        );
    }
}

export default AppointmentsPage;
