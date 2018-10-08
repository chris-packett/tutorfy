import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'

class AppointmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutor: {}
        }
    }
    

    componentDidMount() {
        console.log(this.props.appointment)
        fetch(`https://localhost:5001/api/tutors/profile/${this.props.appointment.tutorId}`)
        .then(resp => resp.json())
        .then(tutorData => {
            console.log(tutorData)
            this.setState({
                tutor: tutorData.results
            })
        })
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
                    <h6 className="p-2">Your will be meeting {this.state.tutor.name} at {location}</h6>
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
