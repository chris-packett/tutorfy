import React, { Component } from 'react';

class ChainedQuizModals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            showModal: false,
            quizAnswers: []
        }
    }

    componentDidMount() {
        this.toggle();
    }

    toggle = () => {
        this.setState({
            showModal: !this.state.showModal
        });
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

        // let quizOptions = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json; charset=utf-8",
        //         "Authorization": "Bearer " + auth.getAccessToken()
        //     },
        //     body: JSON.stringify(quizInfo)
        // }

        // fetch('https://localhost:5001/api/quiz/add', quizOptions)
        // .then(resp => resp.json())
        // .then(quizJSON => {
        //     console.log(quizJSON)
        // })
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
                    // postQuiz={this.postQuizToDatabase}
                    onClickNext={this.handleClickNext}
                    onHide={this.handleModalHide}
                    show={showModal}
                />
            </div>
        );
    }
}

export default ChainedQuizModals;
