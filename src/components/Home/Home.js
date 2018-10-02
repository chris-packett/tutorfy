import React, { Component } from 'react';
import Auth from '../../Auth/Auth'

const auth = new Auth();

class Home extends Component {

    login() {
        auth.login();
    }

    handleNewUser = (userType) => {
        localStorage.setItem('user_type', userType);
        this.login();
    }

    render() {
        const isAuthenticated = auth.isAuthenticated
        const style = { cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }

        return (
            <div className="home-page">
                { isAuthenticated() && ( 
                    <h6>
                        You are logged in!
                    </h6> 
                ) }
                { !isAuthenticated() && (
                    <h6>You are not logged in! Please{' '}
                        <a style={style} onClick={this.login.bind(this)}>
                            Log In
                        </a>
                        {' '}to continue.
                    </h6> 
                ) }
                <div className="home-page-get-started-buttons">
                    <button className="btn btn-dark btn-md" onClick={() => this.handleNewUser("student")}>I'm a Student</button>
                    <button className="btn btn-dark btn-md" onClick={() => this.handleNewUser("tutor")}>I'm a Tutor</button>
                </div>
            </div>
        );
    }
}

export default Home;
