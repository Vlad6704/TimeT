import * as action_type from "../action_type";
import DataStoreService from "../../services/service";
import TimeStat from "../../components/statistic/timeStatistic_class/timeStat";
import statistics_func from "../../functions/statistic/statistics_func";
import moment from "moment";
import {ENABLE_SOUND_REMINDER} from "../action_type";
import {DISABLE_SOUND_REMINDER} from "../action_type";
import {SET_ONGOING_TASKS_TIMER_ID} from "../action_type";
const service = new DataStoreService();

export const setOngoingTasksHandler = (ongoingTask) => {
    return (dispatch, getState) => {

        if(ongoingTask.length === 0 ) {
            dispatch(disableSoundReminder());
        }
        else {
            dispatch(enableSoundReminder());
        }
        dispatch(setOngoingTasks(ongoingTask));
        countTime(dispatch, getState);

    }

};

export const setOngoingTasksTimerId = (timerId) => ({type:SET_ONGOING_TASKS_TIMER_ID, payload:timerId});


export const disableSoundReminder = () => ({type:DISABLE_SOUND_REMINDER});
export const enableSoundReminder = () => ({type:ENABLE_SOUND_REMINDER});
export const setOngoingTasks = (payload) => ({type:action_type.SET_ONGOING_TASKS,payload});
export const setTimeTask = (payload) => ({type:action_type.SET_TIME_TASK,payload});
export const setSwitchableOngoingTask = (payload) => ({type:action_type.SET_SWITCHABLE_ONGOING_TASK,payload});

export const stopTaskHandler = (taskId)=>{
    return (dispatch, getState) => {
        service.stopTask(taskId).then((response)=>{
            // console.log(response.data);
            dispatch(setOngoingTasksHandler(response.data));
        });

        if(getState().router.location.pathname === "/statistics") {
            return service.getTimeTask()
                .then(response => {
                    dispatch(setTimeTask(response.data));
                });
        }
    }
};
export const switchableHandler = (taskId) =>{
    return (dispatch, getState) => {
        const switchableTaskId = getState().ongoingTasks.switchableTaskId;
        if(taskId === switchableTaskId){
            dispatch(setSwitchableOngoingTask(-1));
        }else{
            dispatch(setSwitchableOngoingTask(taskId));
        }
    }
};











//utils


function countTime(dispatch, getState){
    //this function count time for all ongoingTasks and dispatch arr ongoing tasks with 
    //passed time. key: totalPassedTime. func do this every [intervalSec]. interval id sets in state and
    //it's clearing when func starts
    clearInterval(getState().ongoingTasks.timerId);
    const intervalSec = 5;
    const startTime = moment().format("HH:mm");
    const timeShift = getState().appOptions.timeShift;
    const ongoingTasksArr = getState().ongoingTasks.items;
    const timeTaskArr = getState().statistics.timeTaskArr;
    const timeStat = new TimeStat(timeTaskArr,timeShift);
    const ongoingTaskArrWithServerPassedTime = getOngoingTaskArrWithServerPassedTime(ongoingTasksArr, timeStat);
    totalPassedTimeForOngoingTaskHandler(startTime, dispatch, ongoingTaskArrWithServerPassedTime);
    let timerId = setInterval(() => totalPassedTimeForOngoingTaskHandler(startTime, dispatch, ongoingTaskArrWithServerPassedTime)
    ,  intervalSec * 1000);
    dispatch(setOngoingTasksTimerId(timerId));

}


function getServerPassedTimeForTask(task, timeStat){
    const timeFromState = timeStat.getSumTimeForTaskForToday(task.id);
    const passedTimeFromServer = moment.utc(task.PassedTime*1000).format("HH:mm");
    const sumTimeFromStateAndServerPassedTime = statistics_func.getTimeSum(timeFromState, passedTimeFromServer);
    return sumTimeFromStateAndServerPassedTime;
}

function getOngoingTaskArrWithServerPassedTime(ongoingTasksArr, timeStat){
    const ongoingTaskArrWithServerPassedTime = ongoingTasksArr.map(task => {
        task.serverPassedTime = getServerPassedTimeForTask(task, timeStat);
        return task;
    });
    return ongoingTaskArrWithServerPassedTime;
}

function getClientPassedTimeForTask(task, startTime = '00:00'){
    //TODO this func work max for 24 hours
    let clientPassedTime = '00:00';
    if(startTime){
        const currentTime = moment().format("HH:mm");
        if(startTime != currentTime){
            //console.log("currentTime: ", currentTime, "startTime: ", startTime);
            clientPassedTime = statistics_func.getTimeDifference(startTime, currentTime);

        }
    }

    return clientPassedTime;
}

function getOngoingTaskArrWithClientPassedTime(ongoingTasksArr, startTime){
    const ongoingTaskArrWithClientPassedTime = ongoingTasksArr.map(task => {
        task.clientPassedTime = getClientPassedTimeForTask(task, startTime);
        return task;
    });
    return ongoingTaskArrWithClientPassedTime;
}

function getOngoingTaskArrWithTotalPassedTime(startTime, ongoingTaskArrWithServerPassedTime) {
    const ongoingTaskArrWithClientPassedTime = getOngoingTaskArrWithClientPassedTime(ongoingTaskArrWithServerPassedTime, startTime);
    const ongoingTaskArrWithTotalPassedTime = ongoingTaskArrWithClientPassedTime.map( task => {
        task.totalPassedTime = statistics_func.getTimeSum(task.serverPassedTime, task.clientPassedTime);
        return task;
    });
    return ongoingTaskArrWithTotalPassedTime;
}

function totalPassedTimeForOngoingTaskHandler(startTime, dispatch, ongoingTaskArrWithServerPassedTime){
    //get arr Ongoing Tasks with total Passed Time and dispatch it
    const ongoingTaskArrWithTotalPassedTime = getOngoingTaskArrWithTotalPassedTime(startTime, ongoingTaskArrWithServerPassedTime);
    dispatch(setOngoingTasks(ongoingTaskArrWithTotalPassedTime));
}

