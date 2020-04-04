import React from 'react'
import {connect} from "react-redux";
import {onGoToPrev, closeAllModalWindow} from "../../../redux_components/fileSystem/fileSystemActions";
import {bindActionCreators} from "redux";

const GoToPrev = ({onGoToPrev}) =>{
    return (
        <div className={"GoToPrev cursPointSelNon"}
             style={{fontSize:"22px"}}
            onClick={onGoToPrev}
        >
            GoToPrev >
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

const mapDispatchToProps = (dispatch) =>{
        const bindActions = bindActionCreators({onGoToPrev, closeAllModalWindow} , dispatch);
    return{
        onGoToPrev: ()=>{
            bindActions.closeAllModalWindow();
            bindActions.onGoToPrev();
        }
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(GoToPrev);