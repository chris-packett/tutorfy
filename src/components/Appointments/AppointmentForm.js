import React, { Component } from 'react';

class AppointmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            "Location": this.state.location
        }
        console.log(this.state.date)
        console.log(this.state.startTime)
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
    
    render() {
        return (
            <div className="appointment-form-container">
                <form className="appointment-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="date">Date:</label>
                    <input type="date" name="date" onChange={this.handleChange}/>

                    <label htmlFor="startTime">Start Time:</label>
                    <input type="time" name="startTime" onChange={this.handleChange}/>

                    {/* <label htmlFor="session-length">How long?</label>
                    <input type="range" min="0" max="5" value="0" step=".5" 
                        id="session-length" name="session-length" required/> */}

                    <label htmlFor="location">Location:</label>
                    <input type="text" name="location" onChange={this.handleChange}/>

                    <button className="schedule-appointment-button">Schedule</button>
                </form>
            </div>
        );
    }
}

export default AppointmentForm;
