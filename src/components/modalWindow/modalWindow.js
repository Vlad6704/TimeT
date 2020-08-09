import React from 'react'
import ReactDOM from "react-dom";
import './modalWindow.css'
import {connect} from "react-redux";
import {closeAllModalWindow} from "../../redux_components/fileSystem/fileSystemActions";

class ModalWindow extends React.Component {

    constructor(props) {
        super(props);
        this.elModalRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode === 27) {
                this.props.closeAllModalWindow();
            }
        }, true);


    }

    componentWillUnmount() {
        window.removeEventListener("keydown", (e) => {
            if (e.keyCode === 27) {
                this.props.closeAllModalWindow();
            }
        }, true);
    }

    ElModalClickHandler(ev) {
        const elModal = this.elModalRef.current;
        if(ev.target === elModal) this.props.closeAllModalWindow();
    }

    render(){
        const {children, closeAllModalWindow} = this.props;

        return ReactDOM.createPortal(
            (
                <div className={"el-modal"} ref={this.elModalRef} onClick={(ev) => this.ElModalClickHandler(ev)}>

                    <div className={"el-modal__inner"}>
                        <div className={"el-modal__content"}>
                            {children}
                        </div>
                        <div className={"el-modal__close"} onClick={closeAllModalWindow}></div>
                    </div>

                </div>
            ),
            document.querySelector('.el-modal-container')

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeAllModalWindow: () => dispatch(closeAllModalWindow())
    }
}

export default connect(null, mapDispatchToProps)(ModalWindow);