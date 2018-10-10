import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import quizQuestions from '../../Data/quizQuestions.json'

class QuestionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: ''
        }
    }
    
    isLastQuestion = () => {
        return this.props.step === this.props.lastStep
    }

    handleNext = () => {
        this.props.onClickNext(this.state.answer)
        this.setState({
            answer: ''
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleNext();
    }
    
    render() {
        const { show, step, onHide } = this.props
        let currentQuestion = quizQuestions.questions[step - 1]
        let questionMessage = currentQuestion.question
        let questionAnswers = currentQuestion.answers

        return (
            <div>
                <Modal isOpen={show}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader>
                            Question {step}:
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="question">{questionMessage}</label>
                                </div>
                                <fieldset className="form-group col-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" 
                                            type="radio" 
                                            name="answer" 
                                            value="A" 
                                            checked={this.state.answer === "A"} 
                                            onChange={this.handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="answer">
                                            {questionAnswers[0]}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" 
                                            type="radio" 
                                            name="answer" 
                                            value="B" 
                                            checked={this.state.answer === "B"} 
                                            onChange={this.handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="answer">
                                            {questionAnswers[1]}
                                        </label>
                                    </div>
                                </fieldset>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            { !this.isLastQuestion() && (
                                <Button color="primary" onClick={this.handleNext}>Next Question</Button>
                            ) }
                            { this.isLastQuestion() && (
                                <input type="submit" value="Find Tutors" color="success" className="btn btn-success" />
                            ) }
                            <Button color="danger" onClick={onHide}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default QuestionModal;
