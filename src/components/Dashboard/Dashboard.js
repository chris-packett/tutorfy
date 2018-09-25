import React, { Component } from 'react';

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
                {this.state.appointments.map(appointment => {
                    return (
                        <div key={appointment.id}>
                            <h3>{appointment.location}</h3>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Dashboard;
