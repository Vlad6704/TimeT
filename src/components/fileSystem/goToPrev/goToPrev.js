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
            <i className="g-icon icon-folder-solid "></i>
            ...
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

const mapDispatchToProps = (dispatch) =>{

    return{
        onGoToPrev: () => dispatch(onGoToPrev())
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(GoToPrev);