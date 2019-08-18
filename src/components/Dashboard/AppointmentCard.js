import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Auth from '../../Auth/Auth'
import moment from 'moment'

const auth = new Auth();

class AppointmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutor: {},
            student: {}
        }
    }
    
    componentDidMount() {
        console.log(this.props.appointment)
        let options = {
            headers: {
              "Authorization": "Bearer " + auth.getAccessToken()
            }
        }

        if (this.props.userType === "students") {
            // fetch(`https://localhost:5001/api/tutors/profile/${this.props.appointment.tutorId}`, options)
            fetch(`https://tutorfy.herokuapp.com/api/tutors/profile/${this.props.appointment.tutorId}`, options)
            .then(resp => resp.json())
            .then(tutorData => {
                console.log(tutorData)
                this.setState({
                    tutor: tutorData.results
                })
            })
        }
        else if (this.props.userType === "tutors") {
            // fetch(`https://localhost:5001/api/students/profile/${this.props.appointment.studentId}`, options)
            fetch(`https://tutorfy.herokuapp.com/api/students/profile/${this.props.appointment.studentId}`, options)
            .then(resp => resp.json())
            .then(studentData => {
                console.log(studentData)
                this.setState({
                    student: studentData.results
                })
            })  
        }
    }

    getName = () => {
        if (this.props.userType === "tutors") {
            return this.state.student.name
        }
        else if (this.props.userType === "students") {
            return this.state.tutor.name
        }
    }

    render() {
        let { id, startTime, endTime, location } = this.props.appointment

        return (
            <div className="card mb-4 shadow-sm">
                <div className="card-header">
                    <h5>{moment(startTime).format('dddd, MMMM Do YYYY')}</h5>
                    <h6>{moment(startTime).format('h:mm a')} - {moment(endTime).format('h:mm a')}</h6>
                </div>
                <div className="card-body d-flex flex-column">
                    <h6 className="p-2">Your will be meeting {this.getName()} at {location}</h6>
                    <div className="d-flex justify-content-end">
                        <Link to={`/appointment/${id}/edit`} className="btn btn-info m-2">Edit</Link>
                        <Link to={`/appointment/${id}/delete`} className="btn btn-danger m-2">Cancel</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppointmentCard;
