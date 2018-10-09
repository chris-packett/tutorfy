import React, { Component } from 'react';
import Auth from '../../Auth/Auth'
import { Link } from 'react-router-dom'

const auth = new Auth();

class Home extends Component {

    login() {
        auth.login();
    }

    handleSetTypeOfNewUser = (userType) => {
        localStorage.setItem('user_type', userType);
        this.login();
    }

    render() {
        const isAuthenticated = auth.isAuthenticated
        const style = { cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }

        return (
            <div className="home-page">
                { isAuthenticated() && ( 
                    <div>
                        <h6>You are logged in!</h6> 
                        <Link to="/dashboard" className="btn btn-dark btn-md">Go to Dashboard</Link>
                    </div>
                ) }
                { !isAuthenticated() && (
                    <div>
                        <h6>You are not logged in! Please{' '}
                            <a style={style} onClick={this.login.bind(this)}>
                                Log In
                            </a>
                            {' '}to continue.
                        </h6> 
                        <div className="home-page-get-started-buttons">
                            <button className="btn btn-dark btn-md" onClick={() => this.handleSetTypeOfNewUser("student")}>I'm a Student</button>
                            <button className="btn btn-dark btn-md" onClick={() => this.handleSetTypeOfNewUser("tutor")}>I'm a Tutor</button>
                        </div>
                    </div>
                ) }
            </div>
        );
    }
}

export default Home;
