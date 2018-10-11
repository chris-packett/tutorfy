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

    componentDidUpdate() {
        if (!this.state.userType) {
            this.getStudentOrTutorApiEndPoint()
        }
    }
    
    getStudentOrTutorApiEndPoint = () => {
        // let userTypeFromStorage = localStorage.getItem("user_type") + "s";

        let options = {
            headers: {
                "Authorization": "Bearer " + auth.getAccessToken()
            }
        }
        
        fetch(`${API_URL}/users/type`, options)
        .then(resp => resp.json())
        .then(userTypeData => {
            console.log(userTypeData)
            // console.log(userTypeFromStorage)
            console.log(localStorage.getItem("user_type") + "s")
            if (userTypeData.results === "") {
                this.setState({ userType: localStorage.getItem("user_type") + "s" }, () => {
                    this.isProfileCompleted()
                    this.getTutorMatches()
                    this.getAppointments()
                })
            }
            else {
                this.setState({ userType: userTypeData.results }, () => {
                    this.isProfileCompleted()
                    this.getTutorMatches()
                    this.getAppointments()
                })
            }
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
    
    getTutorMatches = () => {
        let options = {
            headers: {
                "Authorization": "Bearer " + auth.getAccessToken()
            }
        }

        fetch(`${API_URL}/tutors/matched`, options)
        .then(resp => resp.json())
        .then(tutorsData => {
            console.log(tutorsData.results)
            let newTutors = tutorsData.results.map(tutorData => tutorData.tutor)
            this.setState({
                tutors: newTutors
            })
        })
    }
    
    getAppointments = () => {
        let options = {
            headers: {
              "Authorization": "Bearer " + auth.getAccessToken()
            }
        }

        fetch(`${API_URL}/appointments/${this.state.userType}`, options)
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
                <AppointmentList 
                    appointments={this.state.appointments} 
                    userType={this.state.userType}
                />
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
