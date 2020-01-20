import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/actions";
import mapStateToProps from "react-redux/es/connect/mapStateToProps";

const RenameFolderButton = ({openRenameFolderForm})=>{

    return (
        <div className={"cursPointSelNon"} onClick={openRenameFolderForm}>
            Rename folder
        </div>
    )
}



export default connect((state) => state,actions)(RenameFolderButton);