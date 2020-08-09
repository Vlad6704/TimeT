import React from 'react'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/fileSystem/fileSystemActions";

const CreateNewTaskButton = ({openCreateNewTaskForm}) =>{
    return (
        <div className={"fileSystem-tools__add-task button"} onClick={openCreateNewTaskForm}>
            <i
                className="icon-add fileSystem-tools__add-task-icon"

            ></i>
            Task
        </div>
    )
}

CreateNewTaskButton.propTypes = {
    openCreateNewTaskForm: PropTypes.func
}

export default connect(null,actions)(CreateNewTaskButton);