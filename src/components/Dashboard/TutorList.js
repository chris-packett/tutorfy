import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class TutorList extends Component {
    render() {
        return (
            <div className="row p-2 d-flex justify-content-center">
                {this.props.tutors.map(tutor => {
                    return (
                        <div key={tutor.id} className="d-flex flex-column justify-content-center align-items-center">
                            <Link to={`/profile/${tutor.id}`} className="d-flex justify-content-center align-items-center">
                                <img src={this.props.profileTest.picture} alt="test-pic" className="tutor-list-profile-pic mb-1" />
                            </Link>
                            <h6>{tutor.name}</h6>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default TutorList;
