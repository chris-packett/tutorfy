import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import quizQuestions from '../../Data/quizQuestions.json'

class QuestionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }
    
    isLastQuestion = () => {
        return this.props.step === this.props.lastStep
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
    
    render() {
        const { show, step, onClickNext, onHide } = this.props
        let questionMessage = quizQuestions.questions[step - 1].question

        return (
            <div>
                <Modal isOpen={show}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader>
                            Question {step}:
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="question">{questionMessage}</label>
                                    {/* <input 
                                        type="text" 
                                        name="question"
                                        value={this.state.question} 
                                        onChange={this.handleChange} 
                                        className="form-control" 
                                    /> */}
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            { !this.isLastQuestion() && (
                                <Button color="primary" onClick={onClickNext}>Next Question</Button>
                            ) }
                            { this.isLastQuestion() && (
                                <input type="submit" value="Submit" color="success" className="btn btn-success" />
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
