import React, { Component } from 'react';
import TutorCard from './TutorCard'

class TutorList extends Component {
    render() {
        return (
            <div className="tutor-list row p-2">
                {this.props.tutors.map(tutor => {
                    return (
                        <div key={tutor.id}>
                            <TutorCard tutor={tutor} />
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default TutorList;
