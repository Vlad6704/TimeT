import React, { useState } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/fileSystem/fileSystemActions';
import {setOngoingTasks} from '../../../redux_components/ongoingTasks/ongoingTasksActions';
import WithService from "../../hoc/with-service/with-service";
import Stages from "../stages/stages";
import './tasks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {bindActionCreators} from "redux";

const Tasks = ({taskClickHandler, idTaskWithOpenStageList,tasks,currentItemId,  openFiSyOptionsPanel}) => {


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
                        <FontAwesomeIcon icon={faTasks} />
                        <span className={'title'}>
                            {item.name}
                        </span>
                        {item.status == 'creating' && `, status: ${item.status}`}
                        {idTaskWithOpenStageList === item.id &&
                             <Stages task={item}   />
                        }
                        <div className={'openOptionsButton'} onClick={(ev) => openFiSyOptionsPanelHandler(ev,item.id)}>
                            <FontAwesomeIcon icon={faPencilAlt} />
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
        tasks: state.tasks.items,
        currentItemId: state.fileSystem.currentItemId,
        idTaskWithOpenStageList: state.fileSystem.idTaskWithOpenStageList,


    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        ...bindActionCreators({...actions,setOngoingTasks}, dispatch )
    }
}


export default WithService()(connect(mapStateToProps,mapDispatchToProps)(Tasks));