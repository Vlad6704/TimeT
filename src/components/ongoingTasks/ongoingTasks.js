import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../redux_components/actions";
import WithService from "../hoc/with-service/with-service";
import './ongoingTasks.css';

const OngoingTasks = ({ongoingTasksArr,tasks,service,setOngoingTasks,setSwitchableOngoingTask, other_inf}) =>{

    const stopTaskHandler = (taskId)=>{
        service.stopTask(taskId).then((response)=>{
            // console.log(response.data);
            setOngoingTasks(response.data);
        }, (error) => {

        });
    }

    const switchableHandler = (taskId) =>{
        if(taskId === other_inf.switchableTaskId){
            setSwitchableOngoingTask(-1);
        }else{
            setSwitchableOngoingTask(taskId);
        }
    }

    function getTaskById(id){
        return tasks.find((item) =>{
            return item.id == id
        })
    }
    function getStageById(task, stageId){
        return task.stages.find((item) =>{
            return item.id == stageId
        })
    }

    const tasksItems = () =>
    {
        if(ongoingTasksArr.length == 0 || tasks.length == 0) return false;
        return ongoingTasksArr.map((item,idx) => {
            const task = getTaskById(item.id);
            const stage =  getStageById(task, item.stageId);
            console.log(ongoingTasksArr);
            let classList = 'ongoingTasksItem';
            if(other_inf.switchableTaskId == item.id) classList +=' switchable';
            return (

                <div className={classList}>
                    name: {task.name}
                    {item.status && `, status: ${item.status}`}
                    {stage && `, stage: ${stage.name} `}
                    <span className={"stopButton"} onClick={() => stopTaskHandler(item.id)}>
                        Stop
                    </span>
                    <span className={'switchableButton'}
                          onClick={() => switchableHandler(item.id)}
                    >
                        Switchable
                    </span>

                </div>
            )
        });
    }


    return (


        <div className={'ongoingTasksItems'} >
            {tasksItems()}
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        ongoingTasksArr:state.ongoingTasksArr,
        tasks:state.tasks,
        other_inf: state.other_inf
    }

}

export default WithService()(connect(mapStateToProps,actions)(OngoingTasks));