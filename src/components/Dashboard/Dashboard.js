import React, { Component } from 'react';
import Auth from '../../Auth/Auth'
import TutorList from './TutorList'
import AppointmentList from './AppointmentList'

const auth = new Auth();

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            tutors: []
        }
    }
    
    componentDidMount() {
        let options = {
            headers: {
              "Authorization": "Bearer " + auth.getAccessToken()
            }
        }

        fetch('https://localhost:5001/api/appointments', options)
        .then(resp => resp.json())
        .then(appointmentsData => {
            console.log(appointmentsData)
            this.setState({
                appointments: appointmentsData.results
            })
        })

        fetch('https://localhost:5001/api/tutors/top/3')
        .then(resp => resp.json())
        .then(tutorData => {
            console.log(tutorData.results)
            this.setState({
                tutors: tutorData.results
            })
        })
    }

    render() {
        const profile = this.props.profile
        const givenName = profile.given_name
        const nameToDisplay = profile['https://tutorfy:auth0:com/full_name'] || givenName

        return (
            <div>
                <h6 className="font-weight-bold text-center mt-4">Your Top 3 Tutors!</h6>
                <TutorList profileTest={this.props.profile} profileTestName={nameToDisplay} tutors={this.state.tutors} />
                <hr/>
                <h6 className="font-weight-bold pl-4 mt-4">Here are your Appointments, {nameToDisplay}:</h6>
                <AppointmentList appointments={this.state.appointments} />
            </div>
        );
    }
}

export default Dashboard;
