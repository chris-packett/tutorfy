import React, { Component } from 'react';
import history from '../../history'
import AppointmentPrice from './AppointmentPrice'
import moment from 'moment'
import Auth from '../../Auth/Auth';

const auth = new Auth();

class AppointmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            startTime: "00:00",
            appointmentLength: 0,
            location: ''         
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        console.log(this.props.tutor)

        let appointmentData = {
            "StartTime": moment(`${this.state.date}T${this.state.startTime}`, moment.HTML5_FMT.DATETIME_LOCAL).format(),
            "AppointmentLength": this.state.appointmentLength,
            "Location": this.state.location,
            "TutorId": this.props.tutor.id
        }

        fetch('https://localhost:5001/api/appointments/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + auth.getAccessToken()
            },
            body: JSON.stringify(appointmentData)
        })
        .then(resp => resp.json())
        .then(appointmentData => {
            console.log(appointmentData)
            history.push('/dashboard')
        })
    }

    formatAppointmentLength = () => {
        let total = this.state.appointmentLength

        if (total === "0.5") {
            let minutes = (total * 60);
            return `${minutes} minutes`
        }
        else if (total === "1") {
            return `${total} hour`
        }
        else if (total === "1.5") {
            let hours = Math.floor(total)
            let minutes = (total - hours) * 60
            return `${hours} hour and ${minutes} minutes`
        }
        else if (total % 1 === 0) {
            return `${total} hours`
        }
        else {
            let hours = Math.floor(total)
            let minutes = (total - hours) * 60
            return `${hours} hours and ${minutes} minutes`
        }
    }
    
    render() {
        return (
            <div className="appointment-form-container">
                <form className="appointment-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="date">Date:</label>
                    <input 
                        type="date" 
                        name="date" 
                        onChange={this.handleChange}
                    />

                    <label htmlFor="startTime">Start Time:</label>
                    <input 
                        type="time" 
                        name="startTime" 
                        onChange={this.handleChange}
                    />

                    <label htmlFor="appointmentLength">How long: <span>{this.formatAppointmentLength()}</span></label>
                    <input 
                        type="range" 
                        min="0" 
                        max="5" 
                        step=".5" 
                        value={this.state.appointmentLength}  
                        name="appointmentLength" 
                        onChange={this.handleChange}
                    />

                    <label htmlFor="location">Location:</label>
                    <input 
                        type="text" 
                        placeholder="i.e. Panera"
                        name="location" 
                        onChange={this.handleChange}
                    />

                    <AppointmentPrice priceRate={this.props.tutor.hourlyRate} appointmentLength={this.state.appointmentLength} />

                    <button className="schedule-appointment-button">Schedule</button>
                </form>
            </div>
        );
    }
}

export default AppointmentForm;
