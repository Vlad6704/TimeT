import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/actions";
import WithService from "../../../../hoc/with-service/with-service";



const RemoveTaskButton = ({service,taskId,setTasks,})=>{

    const removeFolderHandler = ()=>{
        if(!window.confirm("Remove task?"))return false;
        service.removeTask(taskId).then((response)=>{
            // console.log(response.data);
            setTasks(response.data);

        },(error)=>{

        });
    }

    return (
        <div className={"cursPointSelNon"} onClick={removeFolderHandler}>
            Remove Task
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        taskId:state.fileSystem.taskOptionsPanel.optionsPanelIsOpenForTask,
    }
};

export default WithService()(connect(mapStateToProps,actions)(RemoveTaskButton));