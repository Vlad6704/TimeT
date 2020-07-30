import React,{ useState } from 'react';
import RenameTaskForm from './rename/RenameTaskForm/RenameTaskForm';
import {connect} from "react-redux";
import * as actions from "../../../redux_components/fileSystem/fileSystemActions";
import ModalWindow from "../../modalWindow/modalWindow";
import ModTitle from "../../modalWindow/modalElements/modTitle";
import {closeTaskOptionsPanel} from "../../../redux_components/fileSystem/fileSystemActions";

const TaskOptionsPanel = ({removeTaskHandler,openRenameTaskForm, task, closeTaskOptionsPanel}) => {

    const renameTaskButtonHandler = () => {
        closeTaskOptionsPanel();
        openRenameTaskForm();

    }

    return (
        <ModalWindow>
            <ModTitle title={`Tools for: ${task ? task.name:'' }`} />
            <div className={"task-options-panel"}>
                <i className={"icon-pen-solid task-tool-panel__rename-task-button button"} onClick={renameTaskButtonHandler}></i>

                <i className={"icon-trash-alt-solid task-tool-panel__remove-button button"} onClick={() => removeTaskHandler()}></i>
            </div>
        </ModalWindow>
    )
}

const mapStateToProps = (state) =>{
    const taskId = state.fileSystem.taskOptionsPanel.optionsPanelIsOpenForTask;
    const task = state.tasks.items.find( task => task.id === taskId);
    return {
        isOpenRenameTaskForm: state.fileSystem.isOpenRenameTaskForm,
        task
    }
}

export default connect(mapStateToProps,actions)(TaskOptionsPanel);