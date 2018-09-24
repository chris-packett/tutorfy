import React, { Component } from 'react';
import moment from 'moment'

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
        let appointmentData = {
            "StartTime": moment(`${this.state.date}T${this.state.startTime}`, moment.HTML5_FMT.DATETIME_LOCAL).format(),
            "AppointmentLength": this.state.appointmentLength,
            "Location": this.state.location,
        }
        fetch('https://localhost:5001/api/appointments/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(appointmentData)
        })
        .then(resp => resp.json())
        .then(appointmentData => {
            console.log(appointmentData)
        })
    }

    formatAppointmentLength = () => {
        if (this.state.appointmentLength == 1) {
            return `${this.state.appointmentLength} hour`
        }
        else if (this.state.appointmentLength % 1 == 0) {
            return `${this.state.appointmentLength} hours`
        }
        else {
            let total = this.state.appointmentLength
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
                    <input type="date" 
                        name="date" onChange={this.handleChange}
                    />

                    <label htmlFor="startTime">Start Time:</label>
                    <input type="time" 
                        name="startTime" onChange={this.handleChange}
                    />

                    <label htmlFor="appointmentLength">How long: <span>{this.formatAppointmentLength()}</span></label>
                    <input type="range" min="0" max="5" step=".5" value={this.state.appointmentLength}  
                        name="appointmentLength" onChange={this.handleChange}
                    />

                    <label htmlFor="location">Location:</label>
                    <input type="text" 
                        name="location" onChange={this.handleChange}
                    />

                    <button className="schedule-appointment-button">Schedule</button>
                </form>
            </div>
        );
    }
}

export default AppointmentForm;
