import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../redux_components/actions";

const GoToHome = ({onGoToHome}) =>{
    return (
        <div className={"GoToHome cursPointSelNon"}
             onClick={onGoToHome}
        >
            GoToHome >
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps,actions)(GoToHome);