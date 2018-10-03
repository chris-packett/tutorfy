import React, { Component } from 'react';
import AppointmentList from './AppointmentList'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: []
        }
    }
    
    componentDidMount() {
        fetch('https://localhost:5001/api/appointments')
        .then(resp => resp.json())
        .then(appointmentsData => {
            this.setState({
                appointments: appointmentsData.results
            })
        })
    }

    render() {
        const profile = this.props.profile
        const givenName = profile.given_name
        const nameToDisplay = profile['https://tutorfy:auth0:com/full_name'] || givenName

        return (
            <div>
                <h6 className="font-weight-bold pl-4 mt-4">Here are your Appointments, {nameToDisplay}:</h6>
                <AppointmentList appointments={this.state.appointments} />
            </div>
        );
    }
}

export default Dashboard;
