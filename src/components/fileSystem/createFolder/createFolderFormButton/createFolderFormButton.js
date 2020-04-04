import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/fileSystem/fileSystemActions";

const CreateFolderFormButton = ({openCreateFolderForm}) =>{
    return (
        <div
             onClick={openCreateFolderForm}
        >
            CreateFolder >
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps,actions)(CreateFolderFormButton);