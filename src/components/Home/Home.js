import React, { Component } from 'react';

class Home extends Component {
    login() {
        this.props.auth.login();
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
                    <button className="btn btn-dark btn-md">I'm a Student</button>
                    <button className="btn btn-dark btn-md">I'm a Tutor</button>
                </div>
            </div>
        );
    }
}

export default Home;
