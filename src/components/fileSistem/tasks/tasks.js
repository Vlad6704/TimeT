import React, { useState } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/actions';
import WithService from "../../hoc/with-service/with-service";
import Stages from "../stages/stages";


const Tasks = ({tasks ,startTask,currentItemId, service,setOngoingTasks}) => {

    const [openStageListById, setIdForOpenStageList] = useState(-1);

    const taskClickHandler = (id) => {

        if(isHaveStages(id)) setIdForOpenStageList(id);
        else{
            startTaskHandler(id);

        }
    };

    const startTaskHandler = (taskId, stageId)=>{
        startTask(taskId);
        service.startTask(taskId, stageId).then((response) => {
            console.log(response.data);
            setOngoingTasks(response.data);
        }, (error) => {

        });
    };

    const isHaveStages = (taskId) => {
        const item = tasks.find((item) => item.id === taskId);
        return item.stageItemIdx !== -1;

    };


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
    }
};




export default WithService()(connect(mapStateToProps,actions)(Tasks));