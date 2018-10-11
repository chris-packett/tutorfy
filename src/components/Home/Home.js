import React, { Component } from 'react';
import Auth from '../../Auth/Auth'
import { Link } from 'react-router-dom'

import BackgroundSVG from '../BackgroundSVG'
import '../BackgroundSVG.css'

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

        return (
            <div className="svg-container" id="background-svg">
                <BackgroundSVG />
                <img src="/assets/logo-v2.png" alt="logo" id="home-page-logo" />
                <h1 className="home-page-header">Tutorfy</h1>
                <i className="home-page-sub-header">Award-Winning Student-To-Tutor Matching Network</i>
                <img src="/assets/open-book.png" alt="open-book" id="home-page-open-book" />
                <div className="home-page-middle-images">
                    <img src="/assets/column.png" alt="column" id="home-page-column"/>
                    <div className="home-page-v-bar" />
                    <img src="/assets/mortarboard.png" alt="mortarboard" id="home-page-mortarboard"/>
                    <div className="home-page-v-bar" />
                    <img src="/assets/glasses.png" alt="glasses" id="home-page-glasses"/>
                </div>
                <div className="home-page-middle-benefits">
                    <h6 className="home-page-middle-benefits-text">Safety First</h6>
                    <h6 className="home-page-middle-benefits-text">Admissions Ready</h6>
                    <h6 className="home-page-middle-benefits-text">Quality Tutors</h6>
                </div>
                {
                    !isAuthenticated() && (
                        <div>
                            <button className="btn btn-outline-dark btn-md homepage-top-auth-button" onClick={this.login.bind(this)}>
                                Log In
                            </button>
                            <div className="home-page-get-started-buttons">
                                <button className="btn btn-dark btn-md mb-3" onClick={() => this.handleSetTypeOfNewUser("student")}>I'm a Student</button>
                                <button className="btn btn-dark btn-md" onClick={() => this.handleSetTypeOfNewUser("tutor")}>I'm a Tutor</button>
                            </div>
                        </div>
                )
                }
                {
                    isAuthenticated() && (
                        <div>
                            <Link to="/dashboard" className="btn btn-outline-dark btn-md homepage-top-auth-button">Dashboard</Link>
                        </div>
                )
                }
            </div>
        );
    }
}

export default Home;
