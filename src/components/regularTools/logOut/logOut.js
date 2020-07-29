import React from 'react';
import {connect} from "react-redux";
import {logOutHandler} from '../../../redux_components/auth/authActions';

const LogOut = ({logOutHandler}) => {
    return (
        <i className={"icon-logout logout-button"} onClick={logOutHandler}></i>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOutHandler:() => dispatch(logOutHandler()),
    }
}

export default connect(()=>{},mapDispatchToProps)(LogOut);