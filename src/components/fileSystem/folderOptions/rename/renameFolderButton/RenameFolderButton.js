import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";
import mapStateToProps from "react-redux/es/connect/mapStateToProps";

const RenameFolderButton = ({openRenameFolderForm})=>{

    return (
       <i className={"icon-pen-solid folder-options__rename-folder"} onClick={openRenameFolderForm}></i>
    )
}



export default connect((state) => state,actions)(RenameFolderButton);