import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutor: {}
        }
    }
    

    componentDidMount() {
        // fetch(`https://localhost:5001/api/tutors/profile/${this.props.match.params.id}`)
        fetch(`https://tutorfy.herokuapp.com/api/tutors/profile/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(tutorData => {
            console.log(tutorData)
            this.setState({
                tutor: tutorData.results
            })
        })
    }

    render() {
        return (
            <div className="p-2 profile-page">
                <div className="d-flex w-100">
                    <Link to="/dashboard" className="btn btn-dark btn-sm">Back</Link>
                </div>
                <img className="profile-page-profile-picture" src={this.state.tutor.pictureURL} alt="" />
                <h4>{this.state.tutor.name}</h4>
                <h6>Rate: ${this.state.tutor.hourlyRate}.00/hour</h6>
                <Link to={`/appointment/add/tutor/${this.props.match.params.id}`} className="btn btn-dark btn-md">Schedule an Appointment</Link>
            </div>
        );
    }
}

export default ProfilePage;
