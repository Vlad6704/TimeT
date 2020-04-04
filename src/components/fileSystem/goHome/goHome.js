import React from 'react'
import {connect} from "react-redux";
import { onGoToHome} from "../../../redux_components/fileSystem/fileSystemActions";
import {bindActionCreators} from "redux";

const GoToHome = ({onGoToHome}) =>{
    return (
        <div className={"GoToHome cursPointSelNon"}
             style={{fontSize:"22px"}}
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

const mapDispatchToProps = (dispatch) =>{

    return{
        onGoToHome: bindActionCreators(onGoToHome , dispatch)
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(GoToHome);