import React,{ useState } from 'react';
import RenameTaskForm from './rename/RenameTaskForm/RenameTaskForm';
import {connect} from "react-redux";
import * as actions from "../../../redux_components/fileSystem/fileSystemActions";
import RemoveTaskButton from './remove/RemoveTaskButton/RemoveTaskButton';

const TaskOptionsPanel = ({isOpenRenameTaskForm,openRenameTaskForm}) => {


    return (
        <div className={"TaskOptionsPanel"}>
            <div className={"renameTaskButton cursPointSelNon"} onClick={openRenameTaskForm}>
                Rename Task
            </div>
            {isOpenRenameTaskForm &&
                <RenameTaskForm />
            }
            <RemoveTaskButton />
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        isOpenRenameTaskForm: state.fileSystem.isOpenRenameTaskForm
    }
}

export default connect(mapStateToProps,actions)(TaskOptionsPanel);