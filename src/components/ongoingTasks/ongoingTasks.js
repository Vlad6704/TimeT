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


    getPassedTime(item, startTime = 0){
        const timeStat = new TimeStat(this.props.timeTaskArr,this.props.app_options.timeShift);
        let totalSum = 0;
        const timeFromState = timeStat.getSumTimeForTaskForToday(item.id);
        const passedTimeFromServer = moment.utc(item.PassedTime*1000).format("HH:mm");
        const sumTimeFromStateAndServerPassedTime = statistics_func.getTimeSum(timeFromState, passedTimeFromServer);
        console.log(passedTimeFromServer);
        console.log(sumTimeFromStateAndServerPassedTime);
        totalSum = sumTimeFromStateAndServerPassedTime;
        if(startTime){
            const currentTime = moment().format("HH:mm");
            if(startTime != currentTime){
                console.log("currentTime: ", currentTime, "startTime: ", startTime);
                const passedLocalTime = statistics_func.getTimeDifference(startTime, currentTime);
                totalSum = statistics_func.getTimeSum(passedLocalTime, totalSum);
            }
        }

        return totalSum;
    }

    getOngoingTaskArrWithPassedTime(ongoingTasksArr, startTime) {
         return ongoingTasksArr.map(task => {
             task.totalPassedTime = this.getPassedTime(task, startTime);
             return task;
         });
    }
    countTime = (ongoingTasksArr,setOngoingTasks,startTime) => {
        let ongoingTaskArrWithPassedTime = this.getOngoingTaskArrWithPassedTime(ongoingTasksArr, startTime);
        setOngoingTasks(ongoingTaskArrWithPassedTime);



        const setNewSum = () => {
            const ongoingTaskArrWithPassedTime = this.getOngoingTaskArrWithPassedTime(this.props.ongoingTasksArr, startTime);
            setOngoingTasks(ongoingTaskArrWithPassedTime);
        }
        let timerId = setInterval(setNewSum, 20000);

    }

    componentDidMount() {
        const {ongoingTasksArr,timeTaskArr,app_options, setOngoingTasks} = this.props
        const startTime = moment().format("HH:mm");
        this.countTime(ongoingTasksArr,setOngoingTasks,startTime);
    }

    render() {
        const {ongoingTasksArr,tasks,timeTaskArr,app_options, service,setOngoingTasks,setSwitchableOngoingTask, switchableTaskId} = this.props;

        const stopTaskHandler = (taskId)=>{
            service.stopTask(taskId).then((response)=>{
                // console.log(response.data);
                setOngoingTasks(response.data);
            }, (error) => {

            });
        }
        const switchableHandler = (taskId) =>{
            if(taskId === switchableTaskId){
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
                            {item.totalPassedTime ? item.totalPassedTime: this.getPassedTime(item)}
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