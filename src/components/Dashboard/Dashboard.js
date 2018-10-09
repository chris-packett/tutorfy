import React, { Component } from 'react';
import Auth from '../../Auth/Auth'
import TutorList from './TutorList'
import AppointmentList from './AppointmentList'

const auth = new Auth();
const API_URL = "https://localhost:5001/api"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            tutors: []
        }
    }
    
    getAppointments = () => {
        let options = {
            headers: {
              "Authorization": "Bearer " + auth.getAccessToken()
            }
        }

        fetch(`${API_URL}/appointments`, options)
        .then(resp => resp.json())
        .then(appointmentsData => {
            console.log(appointmentsData)
            this.setState({
                appointments: appointmentsData.results
            })
        })
    }

    getTopThreeTutors = () => {
        fetch(`${API_URL}/tutors/top/3`)
        .then(resp => resp.json())
        .then(tutorData => {
            console.log(tutorData.results)
            this.setState({
                tutors: tutorData.results
            })
        })
    }
    
    componentDidMount() {
        this.getAppointments()
        this.getTopThreeTutors()
    }

    render() {
        const profile = this.props.profile
        const givenName = profile.given_name
        const nameToDisplay = profile['https://tutorfy:auth0:com/full_name'] || givenName

        return (
            <div>
                <h6 className="tutor-list-header mt-4">
                    Your Top 3 Tutors!
                </h6>
                <TutorList profileTest={this.props.profile} profileTestName={nameToDisplay} tutors={this.state.tutors} />
                <hr/>
                <h6 className="appointment-list-header pl-4 mt-4">
                    Here are your Appointments, {nameToDisplay}:
                </h6>
                <AppointmentList appointments={this.state.appointments} />
            </div>
        );
    }
}

export default Dashboard;
