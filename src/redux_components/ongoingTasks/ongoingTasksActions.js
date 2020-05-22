import * as action_type from "../action_type";
import DataStoreService from "../../services/service";
import TimeStat from "../../components/statistic/timeStatistic_class/timeStat";
import statistics_func from "../../functions/statistic/statistics_func";
import moment from "moment";
import {ENABLE_SOUND_REMINDER} from "../action_type";
import {DISABLE_SOUND_REMINDER} from "../action_type";
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

export const disableSoundReminder = () => ({type:DISABLE_SOUND_REMINDER});
export const enableSoundReminder = () => ({type:ENABLE_SOUND_REMINDER});
export const setOngoingTasks = (payload) => ({type:action_type.SET_ONGOING_TASKS,payload});
export const setTimeTask = (payload) => ({type:action_type.SET_TIME_TASK,payload});
export const setSwitchableOngoingTask = (payload) => ({type:action_type.SET_SWITCHABLE_ONGOING_TASK,payload});

export const stopTaskHandler = (taskId)=>{
    return (dispatch) => {
        service.stopTask(taskId).then((response)=>{
            // console.log(response.data);
            dispatch(setOngoingTasksHandler(response.data));
        }, (error) => {

        });
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
function getPassedTimeForTask(task, startTime = 0){

    let totalSum = task.staticPassedTime;
    if(startTime){
        const currentTime = moment().format("HH:mm");
        if(startTime != currentTime){
            console.log("currentTime: ", currentTime, "startTime: ", startTime);
            const passedLocalTime = statistics_func.getTimeDifference(startTime, currentTime);
            totalSum = statistics_func.getTimeSum(passedLocalTime, task.staticPassedTime);
        }
    }

    return totalSum;
}

function getOngoingTaskArrWithPassedTime(ongoingTasksArr, startTime) {
    return ongoingTasksArr.map(task => {
        task.totalPassedTime = getPassedTimeForTask(task, startTime);
        return task;
    });
}

function getOngoingTaskArrWithStaticPassedTime(ongoingTasksArr,  timeStat) {
    //return sumTimeFromStateAndServerPassedTime (timeTask and passedTime)
    return ongoingTasksArr.map(task => {
        const timeFromState = timeStat.getSumTimeForTaskForToday(task.id);
        const passedTimeFromServer = moment.utc(task.PassedTime*1000).format("HH:mm");
        const sumTimeFromStateAndServerPassedTime = statistics_func.getTimeSum(timeFromState, passedTimeFromServer);
        task.staticPassedTime = sumTimeFromStateAndServerPassedTime;
        return task;
    });
}

function setOngoingTaskArrWithPassedTime(startTime, dispatch, ongoingTaskArrWithStaticPassedTime){
    let ongoingTaskArrWithPassedTime = getOngoingTaskArrWithPassedTime(ongoingTaskArrWithStaticPassedTime, startTime);
    dispatch(setOngoingTasks(ongoingTaskArrWithPassedTime));
}

function countTime(dispatch, getState){
    const startTime = moment().format("HH:mm");
    const timeShift = getState().appOptions.timeShift;
    const ongoingTasksArr = getState().ongoingTasks.items;
    const timeTaskArr = getState().statistics.timeTaskArr;
    const timeStat = new TimeStat(timeTaskArr,timeShift);
    const ongoingTaskArrWithStaticPassedTime = getOngoingTaskArrWithStaticPassedTime(ongoingTasksArr,  timeStat);
    setOngoingTaskArrWithPassedTime(startTime, dispatch, ongoingTaskArrWithStaticPassedTime);



    const setNewSum = () => {
        setOngoingTaskArrWithPassedTime(startTime, dispatch, ongoingTaskArrWithStaticPassedTime);
    }
    let timerId = setInterval(setNewSum, 5000);


}