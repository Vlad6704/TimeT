import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/fileSystem/fileSystemActions";

const CreateNewTaskButton = ({openCreateNewTaskForm}) =>{
    return (
        <div
            onClick={openCreateNewTaskForm}
        >
            CreateNewTask >
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps,actions)(CreateNewTaskButton);