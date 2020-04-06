import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../redux_components/ongoingTasks/ongoingTasksActions";
import WithService from "../hoc/with-service/with-service";
import './ongoingTasks.css';
import TimeStat from '../statistic/timeStatistic_class/timeStat';
import Moment from 'moment';
import {extendMoment} from "moment-range";
import statistics_func from "../../functions/statistic/statistics_func";

const moment = extendMoment(Moment);

class OngoingTasks extends React.Component {




    componentDidMount() {

    }

    render() {
        const {ongoingTasksArr,tasks,stopTaskHandler,switchableHandler, switchableTaskId} = this.props;



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
            if(ongoingTasksArr == undefined || ongoingTasksArr.length == 0 || tasks.length == 0) return false;


            return ongoingTasksArr.map((item,idx) => {
                const task = getTaskById(item.id);
                const stage =  getStageById(task, item.stageId);
                console.log(ongoingTasksArr);
                let classList = 'ongoingTasksItem';
                if(switchableTaskId == item.id) classList +=' switchable';
                return (

                    <div className={classList}>
                        name: {task.name}
                        {item.status && `, status: ${item.status}`}
                        {stage && `, stage: ${stage.name} `}
                        <span className={"duration"} style={{marginLeft:'7px'}}>
                            {/*{item.totalPassedTime && item.totalPassedTime}*/}
                            {item.totalPassedTime}
                        </span>
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
}




const mapStateToProps = (state)=>{
    return {
        ongoingTasksArr:state.ongoingTasks.items,
        tasks:state.tasks.items,
        switchableTaskId: state.ongoingTasks.switchableTaskId,
        timeTaskArr:state.timeTaskArr,
        app_options:state.appOptions,
    }

}

export default WithService()(connect(mapStateToProps,actions)(OngoingTasks));