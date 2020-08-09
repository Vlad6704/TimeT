import React from 'react'
import PropTypes from 'prop-types';
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

CreateFolderFormButton.propTypes = {
    openCreateFolderForm: PropTypes.func
}


export default connect(null,actions)(CreateFolderFormButton);