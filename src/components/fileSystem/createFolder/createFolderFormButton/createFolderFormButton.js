import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/fileSystem/fileSystemActions";

const CreateFolderFormButton = ({openCreateFolderForm}) =>{
    return (
        <div className="button fileSystem-tools__add-folder"
             onClick={openCreateFolderForm}
        >
            <i className="g-icon icon-folder-solid fileSystem-tools__add-folder-icon"></i>
            New
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps,actions)(CreateFolderFormButton);