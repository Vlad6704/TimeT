import * as action_type from "../action_type";
import DataStoreService from "../../services/service";
const service = new DataStoreService();

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