import * as action_type from "../action_type";
import DataStoreService from "../../services/service";
import TimeStat from "../../components/statistic/timeStatistic_class/timeStat";
import statistics_func from "../../functions/statistic/statistics_func";
import moment from "moment";
const service = new DataStoreService();

export const setOngoingTasksHandler = (ongoingTask) => {
    return (dispatch, getState) => {

        dispatch(setOngoingTasks(ongoingTask));
        countTime(dispatch, getState);
    }

}
export const setOngoingTasks = (payload) => ({type:action_type.SET_ONGOING_TASKS,payload});
export const setTimeTask = (payload) => ({type:action_type.SET_TIME_TASK,payload});
export const setSwitchableOngoingTask = (payload) => ({type:action_type.SET_SWITCHABLE_ONGOING_TASK,payload});

export const stopTaskHandler = (taskId)=>{
    return (dispatch) => {
        service.stopTask(taskId).then((response)=>{
            // console.log(response.data);
            dispatch(setOngoingTasks(response.data));
        }, (error) => {

        });
    }
}
export const switchableHandler = (taskId) =>{
    return (dispatch, getState) => {
        const switchableTaskId = getState().ongoingTasks.switchableTaskId;
        if(taskId === switchableTaskId){
            dispatch(setSwitchableOngoingTask(-1));
        }else{
            dispatch(setSwitchableOngoingTask(taskId));
        }
    }
}














//utils
function getPassedTimeForTask(item, ongoingTasksArr, startTime = 0, timeStat){

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

function getOngoingTaskArrWithPassedTime(ongoingTasksArr, startTime, timeStat) {
    return ongoingTasksArr.map(task => {
        task.totalPassedTime = getPassedTimeForTask(task, ongoingTasksArr, startTime, timeStat);
        return task;
    });
}

function countTime(dispatch, getState){
    const startTime = moment().format("HH:mm");
    const timeShift = getState().appOptions.timeShift;
    setOngoingTaskArrWithPassedTime(startTime, timeShift, getState, dispatch);



    const setNewSum = () => {
        setOngoingTaskArrWithPassedTime(startTime, timeShift, getState, dispatch);
    }
    let timerId = setInterval(setNewSum, 20000);

    function setOngoingTaskArrWithPassedTime(startTime, timeShift, getState,dispatch){
        const ongoingTasksArr = getState().ongoingTasks.items;
        const timeTaskArr = getState().timeTaskArr;
        const timeStat = new TimeStat(timeTaskArr,timeShift);
        let ongoingTaskArrWithPassedTime = getOngoingTaskArrWithPassedTime(ongoingTasksArr, startTime,timeStat);
        dispatch(setOngoingTasks(ongoingTaskArrWithPassedTime));
    }
}