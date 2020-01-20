import React from 'react';
import WithService from "../../../../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/actions";

const getInputVal = () =>{
    return document.getElementById("taskName").value;
}

const RenameTaskForm = ({service,taskId,setTasks})=>{

    const renameTaskHandler = (taskName)=>{

        service.renameTask(taskName,taskId).then((response)=>{
            // console.log(response.data);
            setTasks(response.data);
        },(error)=>{

        });
    }
    return (
        <div>
            <input id={'taskName'}/>
            <button onClick={()=> renameTaskHandler(getInputVal())}>Submit</button>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        taskId:state.fileSistem.taskOptionsPanel.optionsPanelIsOpenForTask,
    }
}

export default WithService()(connect(mapStateToProps,actions)(RenameTaskForm));