import * as action_type from "../action_type";

export const setOngoingTasks = (payload) => ({type:action_type.SET_ONGOING_TASKS,payload});
export const setTimeTask = (payload) => ({type:action_type.SET_TIME_TASK,payload});
export const setSwitchableOngoingTask = (payload) => ({type:action_type.SET_SWITCHABLE_ONGOING_TASK,payload});