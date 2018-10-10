import React, { Component } from 'react';
import AppointmentCard from './AppointmentCard'

class AppointmentList extends Component {
    render() {
        return (
            <div className="row p-3">
                {this.props.appointments.map(appointment => {
                    return (
                        <div key={appointment.id} className="col-md-12">
                            <AppointmentCard 
                                appointment={appointment} 
                                userType={this.props.userType}
                            />
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default AppointmentList;
