import React,{ useState } from 'react';
import RenameTaskForm from './rename/RenameTaskForm/RenameTaskForm';
import {connect} from "react-redux";
import * as actions from "../../../redux_components/fileSystem/fileSystemActions";
import RemoveTaskButton from './remove/RemoveTaskButton/RemoveTaskButton';

const TaskOptionsPanel = ()=> {

    const [isOpenRenameTaskForm, setOpenRenameTaskForm] = useState(false);

    return (
        <div className={"TaskOptionsPanel"}>
            <div className={"renameTaskButton cursPointSelNon"} onClick={() => setOpenRenameTaskForm(true)}>
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
        // optionsPanelIsOpenForTask:state.fileSystem.taskOptionsPanel.optionsPanelIsOpenForTask,
    }
}

export default connect(mapStateToProps,actions)(TaskOptionsPanel);