import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/fileSystem/fileSystemActions";

const CreateNewTaskButton = ({openCreateNewTaskForm}) =>{
    return (
        <div className={"fileSystem-tools__add-task button"}>
            <i
                className="icon-add fileSystem-tools__add-task-icon"
                onClick={openCreateNewTaskForm}
            ></i>
            Task
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps,actions)(CreateNewTaskButton);