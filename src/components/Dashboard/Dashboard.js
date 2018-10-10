import React, { Component } from 'react';
import Auth from '../../Auth/Auth'
import TutorList from './TutorList'
import AppointmentList from './AppointmentList'
import ChainedQuizModals from '../Quiz/ChainedQuizModals';
import QuestionModal from '../Quiz/QuestionModal';

const auth = new Auth();
const API_URL = "https://localhost:5001/api"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            tutors: [],
            userType: "",
            isProfileCompleted: true
        }
    }
    
    componentDidMount() {
        this.getTopThreeTutors()
        this.getAppointments()
    }

    componentDidUpdate() {
        if (!this.state.userType) {
            this.getStudentOrTutorApiEndPoint()
        }
    }
    
    getStudentOrTutorApiEndPoint = () => {
        let userType = localStorage.getItem("user_type") + "s";

        let options = {
            headers: {
                "Authorization": "Bearer " + auth.getAccessToken()
            }
        }
        
        fetch(`${API_URL}/users/type`, options)
        .then(resp => resp.json())
        .then(userTypeData => {
            console.log(userTypeData)
            this.setState({
                userType: userTypeData.results || userType
            }, () => this.isProfileCompleted())
        })
    }
    
    isProfileCompleted = () => {
        console.log(`${API_URL}/${this.state.userType}`)

        let options = {
            headers: {
                "Authorization": "Bearer " + auth.getAccessToken()
            }
        }

        fetch(`${API_URL}/${this.state.userType}/profile_complete`, options)
        .then(resp => resp.json())
        .then(isProfileCompletedData => {
            console.log(isProfileCompletedData)
            this.setState({
                isProfileCompleted: isProfileCompletedData.results
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
    
    render() {
        const profile = this.props.profile
        const givenName = profile.given_name
        const nameToDisplay = profile['https://tutorfy:auth0:com/full_name'] || givenName

        return (
            <div>
                <h6 className="tutor-list-header mt-4">
                    Your Top {this.state.tutors.length} Tutors!
                </h6>
                <TutorList profileTest={this.props.profile} profileTestName={nameToDisplay} tutors={this.state.tutors} />
                <hr/>
                <h6 className="appointment-list-header pl-4 mt-4">
                    Here are your Appointments, {nameToDisplay}:
                </h6>
                <AppointmentList appointments={this.state.appointments} />
                <ChainedQuizModals 
                    modalList={[QuestionModal, QuestionModal, QuestionModal]}
                    isProfileCompleted={this.state.isProfileCompleted}
                    userType={this.state.userType} 
                />
            </div>
        );
    }
}

export default Dashboard;
