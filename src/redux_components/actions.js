import DataStoreService from "../services/service";
import * as action_type from './action_type';

const service = new DataStoreService();

export const setTasks = (payload) => ({type: action_type.SET_TASKS,payload});
export const setStore = (payload) => ({type:action_type.SET_STORE,payload});
export const startTask = (payload) => ({type:action_type.START_TASK,payload});

//fileSystemActions
export const onSerfing = (payload) => ({type:action_type.ON_SERFING, payload});
export const onGoToPrev = () => ({type:action_type.ON_GO_TO_PREV});
export const onGoToHome = () => ({type:action_type.ON_GO_TO_HOME});
export const openCreateFolderForm = () => ({type: action_type.OPEN_CREATE_FOLDER_FORM});
export const closeAllModalWindow = () => ({type: action_type.CLOSE_ALL_MODAL_WINDOW});
export const createNewFolder = (payload) => ({type:action_type.CREATE_NEW_FOLDER,payload});
export const openCreateNewTaskForm = () => ({type:action_type.OPEN_CREATE_NEW_TASK_FORM});
export const setNewTask = (payload) => ({type:action_type.CREATE_NEW_TASK,payload});
export const CreateNewTask = (payload) => {
    return (dispatch,getState)  => {
        const state = getState();
        payload.folderId = state.fileSystem.currentItemId;
        dispatch(setNewTask(payload));
        dispatch(closeAllModalWindow());

    }
};
export const setFileSystemItems = (payload) => ({type:action_type.SET_FILE_SYSTEM_ITEMS,payload});
export const openRenameFolderForm = () => ({type:action_type.OPEN_RENAME_FOLDER_FORM});
export const setFolderNotAvailable = (folderId) => ({type:action_type.SET_FOLDER_NOT_AVAILABLE,payload:folderId});
export const setFolderAvailable = (folderId) => ({type:action_type.SET_FOLDER_AVAILABLE,payload:folderId});
export const setReplaceFolderId = (folderId) => ({type:action_type.SET_REPLACE_FOLDER_ID,payload: folderId});
export const openFiSyOptionsPanel = (taskId) => ({type:action_type.OPEN_FI_SY_OPTIONS_PANEL,payload: taskId});

//tasksActions
export const increaseTemporaryIdForTask = () => ({type:action_type.INCREASE_TEMPORARY_ID_FOR_TASK});
export const changeStatusAndSetIdForTaskByTemporaryId = (payload) => ({type:action_type.CHANGE_STATUS_AND_SET_ID_FOR_TASK_BY_TEMPORARY_ID,payload});
export const setOngoingTasks = (payload) => ({type:action_type.SET_ONGOING_TASKS,payload});
export const setTimeTask = (payload) => ({type:action_type.SET_TIME_TASK,payload});
export const setSwitchableOngoingTask = (payload) => ({type:action_type.SET_SWITCHABLE_ONGOING_TASK,payload});

//statisticActions
export const setDateRange = (payload) => ({type:action_type.SET_DATE_RANGE,payload});
export const setDateRangeStartDate = (payload) => ({type:action_type.SET_DATE_RANGE_START_DATE,payload});
export const setDateRangeEndDate = (payload) => ({type:action_type.SET_DATE_RANGE_END_DATE,payload});
export const setStatChartsTaskArr = (payload) => ({type:action_type.SET_STAT_CHARTS_TASK_ARR,payload});
export const pushOrRemIdForStatChartTaskArr = (payload) => ({type:action_type.PUSH_OR_REM_ID_FOR_STAT_CHART_TASK_ARR,payload});

export const fetchStore = () => {
    return (dispatch) => {
        service.getStore().then((response) =>{
            // console.log(response.data);
            const data = response.data;
            let tasks;
            let fileSystemItems;
            let ongoingTasksArr;
            if(data.tasks) tasks = JSON.parse(data.tasks);
            else  tasks = [];
            if(data.fileSystem) fileSystemItems = JSON.parse(data.fileSystem);
            else fileSystemItems = [];
            if(data.activeTask) ongoingTasksArr = data.activeTask;
            else ongoingTasksArr = [];
            dispatch(setTasks(tasks));
            dispatch(setFileSystemItems(fileSystemItems));
            dispatch(setOngoingTasks(ongoingTasksArr));

            if(data.activeTask[0]) dispatch(setSwitchableOngoingTask(data.activeTask[0].id));
        }, (error) =>{
            console.log(error)
        });
        service.getTimeTask().then((response) => {

            dispatch(setTimeTask(response.data));

        },(error)=>{

        })
    }
}

