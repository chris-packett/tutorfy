import React, { Component } from 'react';
import Auth from "../../Auth/Auth"

const auth = new Auth();

class ChainedQuizModals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: "",
            currentIndex: 0,
            showModal: false,
            quizAnswers: []
        }
    }

    componentDidMount() {
        this.toggle();
        this.getStudentOrTutorProfile();
    }

    toggle = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    getStudentOrTutorProfile = () => {
        let options = {
            headers: {
                "Authorization": "Bearer " + auth.getAccessToken()
            }
        }

        fetch("https://localhost:5001/api/users/type", options)
        .then(resp => resp.json())
        .then(userType => {
            console.log(userType)
            this.setState({
                userType: userType.results
            })
        })
    }

    postQuizToDatabase = () => {
        let quizAnswers = this.state.quizAnswers.map(answer => {
            if (answer === "A") {
                return 1
            }
            else if (answer === "B") {
                return 2
            }
        })
        
        let quizInfo = {
            "AnswerOne": quizAnswers[0],
            "AnswerTwo": quizAnswers[1],
            "AnswerThree": quizAnswers[2]
        }
        
        console.log(quizInfo)
        
        let quizOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + auth.getAccessToken()
            },
            body: JSON.stringify(quizInfo)
        }
        
        let otherOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + auth.getAccessToken()
            }
        }
        
        fetch('https://localhost:5001/api/quizzes/add', quizOptions)
        .then(resp => resp.json())
        .then(quizJSON => {
            console.log(quizJSON)
            return fetch(`https://localhost:5001/api/${this.state.userType}/quiz/add/${quizJSON.results.id}`, otherOptions)
        })
        .then(resp => resp.json())
        .then(updatedStudentOrTutor => {
            console.log(updatedStudentOrTutor)
        })
    }
    
    handleClickNext = (quizAnswer) => {
        const { modalList } = this.props;
        const { currentIndex } = this.state;
    
        if (currentIndex < modalList.length - 1) {
            this.setState({
                currentIndex: currentIndex + 1,
                quizAnswers: this.state.quizAnswers.concat(quizAnswer)
            });
        } 
        else {
            this.setState({
                showModal: false,
                quizAnswers: this.state.quizAnswers.concat(quizAnswer)
            }, () => this.postQuizToDatabase());
        }
    }
    
    handleModalHide = () => {
        this.setState({showModal: false});
    }

    render() {
        const { modalList } = this.props;
        const { currentIndex, showModal } = this.state;
        const ModalComponent = modalList[currentIndex];

        return (
            <div>
                <ModalComponent
                    step={currentIndex + 1}
                    lastStep={modalList.length}
                    onClickNext={this.handleClickNext}
                    onHide={this.handleModalHide}
                    show={showModal}
                />
            </div>
        );
    }
}

export default ChainedQuizModals;
