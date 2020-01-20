import React, { useState } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/actions';
import WithService from "../../hoc/with-service/with-service";
import Stages from "../stages/stages";
import './tasks.css';

const Tasks = ({tasks,other_inf ,startTask,currentItemId, service,setOngoingTasks, openFiSyOptionsPanel,setSwitchableOngoingTask}) => {

    const [openStageListById, setIdForOpenStageList] = useState(-1);

    const taskClickHandler = (id) => {

        if(isHaveStages(id)) setIdForOpenStageList(id);
        else{
            startTaskHandler(id);

        }
    };

    const startTaskHandler = (taskId, stageId)=>{
        startTask(taskId);
        if(other_inf.switchableTaskId !== -1){
            service.stopTask(other_inf.switchableTaskId)
                .then((response) => {
                    setSwitchableOngoingTask(taskId);
                    return service.startTask(taskId, stageId);
                })
                .then((response) => {
                    console.log(response.data);
                    setOngoingTasks(response.data);
                }, (error) => {

                });

        }else{
            service.startTask(taskId, stageId).then((response) => {
                console.log(response.data);
                setOngoingTasks(response.data);
            }, (error) => {

            });
        }
    };

    const isHaveStages = (taskId) => {
        const item = tasks.find((item) => item.id === taskId);
        return item.stageItemIdx !== -1;

    };

    const openFiSyOptionsPanelHandler = (ev,taskId) => {
        ev.stopPropagation();
        openFiSyOptionsPanel(taskId);
    }

    const getTasksArr =  tasks.map(item => {
            if(currentItemId === item.folderId){
                return (
                    <div className={"task"}
                         onClick={()=>taskClickHandler(item.id)}
                    >
                        TaskTitle: {item.name}
                        {item.status == 'creating' && `, status: ${item.status}`}
                        {openStageListById === item.id &&
                             <Stages task={item}  stageClickHandler={startTaskHandler} />
                        }
                        <div className={'openOptionsButton'} onClick={(ev) => openFiSyOptionsPanelHandler(ev,item.id)}>
                            Open options
                        </div>
                    </div>
                )
            }
        })


    return (
        <div className={'tasks'}>
            {getTasksArr}
        </div>
    )

}

const mapStateToProps = (state) =>{
    return {
        tasks: state.tasks,
        currentItemId: state.fileSistem.currentItemId,
        other_inf: state.other_inf,
    }
};




export default WithService()(connect(mapStateToProps,actions)(Tasks));