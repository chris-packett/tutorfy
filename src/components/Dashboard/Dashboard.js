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
        return (
            <div>
                <h3 className="text-center mt-4">Your Appointments:</h3>
                <AppointmentList appointments={this.state.appointments} />
            </div>
        );
    }
}

export default Dashboard;
