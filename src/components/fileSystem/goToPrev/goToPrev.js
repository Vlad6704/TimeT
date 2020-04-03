import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../redux_components/actions";
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
    const {onGoToPrev, closeAllModalWindow} = bindActionCreators(actions , dispatch);
    return{
        onGoToPrev: ()=>{
            closeAllModalWindow();
            onGoToPrev();
        }
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(GoToPrev);