import React, { Component } from 'react';

class ChainedQuizModals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            showModal: false
        }

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.toggle();
    }

    toggle() {
        this.setState({
          showModal: !this.state.showModal
        });
    }

    handleClickNext = () => {
        const { modalList } = this.props;
        const { currentIndex } = this.state;
    
        if (currentIndex < modalList.length - 1) {
          this.setState({currentIndex: currentIndex + 1});
        } 
        else {
          this.setState({showModal: false});
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
