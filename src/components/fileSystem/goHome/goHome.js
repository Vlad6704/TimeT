import React from 'react'
import {connect} from "react-redux";
import { onGoToHome} from "../../../redux_components/fileSystem/fileSystemActions";
import {bindActionCreators} from "redux";

const GoToHome = ({onGoToHome}) =>{
    return (
        <i className={"icon-home-solid fileSystem-tools__home"} onClick={onGoToHome}></i>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

const mapDispatchToProps = (dispatch) =>{

    return{
        onGoToHome: bindActionCreators(onGoToHome , dispatch)
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(GoToHome);