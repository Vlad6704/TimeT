import React from 'react'
import ReactDOM from "react-dom";
import './modalWindow.css'
import {connect} from "react-redux";
import {closeAllModalWindow} from "../../redux_components/fileSystem/fileSystemActions";

class ModalWindow extends React.Component {

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

    render(){
        const {children, closeAllModalWindow} = this.props;

        return ReactDOM.createPortal(
            (
                <div className={"el-modal"}>

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