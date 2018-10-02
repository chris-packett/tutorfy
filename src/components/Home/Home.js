import React, { Component } from 'react';

class Home extends Component {

    login() {
        this.props.auth.login();
    }

    handleUserType = (userType) => {
        localStorage.setItem('user_type', userType);
    }

    render() {
        const { isAuthenticated } = this.props.auth
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
                    <button className="btn btn-dark btn-md" onClick={() => this.handleUserType("student")}>I'm a Student</button>
                    <button className="btn btn-dark btn-md" onClick={() => this.handleUserType("tutor")}>I'm a Tutor</button>
                </div>
            </div>
        );
    }
}

export default Home;
