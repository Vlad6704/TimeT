import React from 'react'
import './ongoingTasksItems.css'



const OngoingTasksItems = ({ongoingTasksArr,tasks,stopTaskHandler,switchableHandler, switchableTaskId}) =>
{




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



    if(ongoingTasksArr == undefined || ongoingTasksArr.length == 0 || tasks.length == 0) return false;


    return ongoingTasksArr.map((item,idx) => {
        const task = getTaskById(item.id);
        // const stage =  getStageById(task, item.stageId);
        let classList = 'ongoing-task-item';
        if(switchableTaskId == item.id) classList +=' ongoing-task-item_switchable';
        return (

            <div key={item.id} className={classList}>
                <img className="ongoing-task-item__run-icon" src="/icons/clock.svg" alt="clock" />
                <span className="ongoing-task-item__title">
                    {task.name}
                </span>
                {/*{item.status && `, status: ${item.status}`}*/}
                {/*{stage && `, stage: ${stage.name} `}*/}
                <span className={"ongoing-task-item__duration"}>
                    {/*{item.totalPassedTime && item.totalPassedTime}*/}
                    {item.totalPassedTime}
                </span>
                <i className="icon-stop ongoing-task-item__stop-button button" onClick={() => stopTaskHandler(item.id)}></i>
                <i className={'icon-reload ongoing-task-item__switchable-button button'} onClick={() => switchableHandler(item.id)}></i>

            </div>
        )
    });
}

export default OngoingTasksItems;