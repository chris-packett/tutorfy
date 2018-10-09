import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class TutorCard extends Component {
    render() {
        let tutor = this.props.tutor
        return (
            <div className="tutor-card">
                <Link to={`/profile/${tutor.id}`} className="tutor-card-link">
                    <img className="tutor-card-profile-pic"
                        src={tutor.pictureURL} 
                        alt="test-pic"  
                    />
                </Link>
                <h6>
                    {tutor.name}
                </h6>
            </div>
        );
    }
}

export default TutorCard;
