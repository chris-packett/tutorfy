import React, { Component } from 'react';
import AppointmentEducator from './AppointmentEducator'
import AppointmentForm from './AppointmentForm'
import AppointmentHeader from './AppointmentHeader'

class AppointmentsPage extends Component {
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
            this.setState({ tutor: tutorData.results })
        })
    }

    render() {
        return (
            <div className="appointments-page">
                <AppointmentHeader />
                <AppointmentEducator tutor={this.state.tutor} />
                <AppointmentForm tutor={this.state.tutor} />
            </div>
        );
    }
}

export default AppointmentsPage;
