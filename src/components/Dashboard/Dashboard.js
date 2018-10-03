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

    firstLetterCapitalNickName = (nickname) => {
        if (nickname) {
            return nickname.charAt(0).toUpperCase() + nickname.slice(1);
        }
    }

    render() {
        const profile = this.props.profile
        const nickname = this.firstLetterCapitalNickName(profile.nickname)

        return (
            <div>
                <h6 className="font-weight-bold pl-4 mt-4">Here are your Appointments, {nickname}:</h6>
                <AppointmentList appointments={this.state.appointments} />
            </div>
        );
    }
}

export default Dashboard;
