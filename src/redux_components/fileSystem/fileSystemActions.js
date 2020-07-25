import * as action_type from "../action_type";
import DataStoreService from "../../services/service";
import {setOngoingTasks, setOngoingTasksHandler, setSwitchableOngoingTask, setTimeTask} from "../ongoingTasks/ongoingTasksActions";
const service = new DataStoreService();

export const onSerfing = (payload) => ({type:action_type.ON_SERFING, payload});


export const onGoToHome = () => ({type:action_type.ON_GO_TO_HOME});
export const closeAllModalWindow = () => ({type: action_type.CLOSE_ALL_MODAL_WINDOW});
export const openCreateNewTaskForm = () => ({type:action_type.OPEN_CREATE_NEW_TASK_FORM});
export const createNewFolder = (payload) => ({type:action_type.CREATE_NEW_FOLDER,payload});
export const openRenameFolderForm = () => ({type:action_type.OPEN_RENAME_FOLDER_FORM});
export const setFileSystemItems = (payload) => ({type:action_type.SET_FILE_SYSTEM_ITEMS,payload});
export const openCreateFolderForm = () => ({type: action_type.OPEN_CREATE_FOLDER_FORM});
export const setFolderNotAvailable = (folderId) => ({type:action_type.SET_FOLDER_NOT_AVAILABLE,payload:folderId});
export const setFolderAvailable = (folderId) => ({type:action_type.SET_FOLDER_AVAILABLE,payload:folderId});
export const setReplaceFolderId = (folderId) => ({type:action_type.SET_REPLACE_FOLDER_ID,payload: folderId});
export const openFiSyOptionsPanel = (taskId) => ({type:action_type.OPEN_FI_SY_OPTIONS_PANEL,payload: taskId});
export const setNewTask = (payload) => ({type:action_type.CREATE_NEW_TASK,payload});
export const increaseTemporaryIdForTask = () => ({type:action_type.INCREASE_TEMPORARY_ID_FOR_TASK});
export const changeStatusAndSetIdForTaskByTemporaryId = (payload) => ({type:action_type.CHANGE_STATUS_AND_SET_ID_FOR_TASK_BY_TEMPORARY_ID,payload});
export const startTask = (payload) => ({type:action_type.START_TASK,payload});
export const setTasks = (payload) => ({type: action_type.SET_TASKS,payload});
export const openRenameTaskForm = () => ({type:action_type.OPEN_RENAME_TASK_FORM});
export const setIdTaskWithOpenStageList = (id) => ({type:action_type.SET_ID_TASK_WITH_OPEN_STAGE_LIST, payload:id});

export const createNewTask = (payload) => {
    return (dispatch,getState)  => {
        const state = getState();
        payload.folderId = state.fileSystem.currentItemId;
        dispatch(setNewTask(payload));
        dispatch(closeAllModalWindow());

    }
};
export const onGoToPrev = () => {
    return (dispatch, setState) => {
        dispatch({type:action_type.ON_GO_TO_PREV});
        dispatch(closeAllModalWindow());
    }
}
export const createNewFolderHandler = (folderName) => {
    return (dispatch, getState) => {
        const currentFolderId = getState().fileSystem.currentItemId;
        dispatch(createNewFolder(folderName));
        service.createNewFolder({name:folderName,parentsId:currentFolderId}).then((response)=>{
            console.log(response.data);
        },(error)=>{

        });
    }
}
export const GetNewIdAndCreateNewTask = (ObjFormVal)=>{
    return (dispatch, getState) => {
        const temporaryId = getState().tasks.newTemporaryIdForNewTask;
        const folderId = getState().fileSystem.currentItemId;
        ObjFormVal.folderId = folderId;
        dispatch(createNewTask({
            getObjFormVal: ObjFormVal,
            temporaryId
        }));
        dispatch(increaseTemporaryIdForTask());
        service.createNewTask(ObjFormVal).
        then((response) =>{
                console.log(response.data);
                if(response.data.status === "success") dispatch(changeStatusAndSetIdForTaskByTemporaryId({temporaryId:temporaryId, status: 'created', id:response.data.idNewTask}));

            },
            (error) =>{       console.log(error)    });

    };
}
export const removeFolderHandler = ()=>{
    return (dispatch, getState) => {
        const currentFolderId = getState().fileSystem.currentItemId;
        if(!window.confirm("Remove ?"))return false;
        service.removeFolder(currentFolderId).then((response)=>{
            // console.log(response.data);
            dispatch(setFileSystemItems(response.data));
            dispatch(onGoToHome());
        },(error)=>{

        });
    }
}
export const renameFolderHandler = (folderName)=>{
    return (dispatch,getState) => {
        const currentFolderId = getState().fileSystem.currentItemId;
        service.renameFolder({folderName:folderName,folderId:currentFolderId}).then((response)=>{
            // console.log(response.data);
            dispatch(setFileSystemItems(response.data));
            dispatch(closeAllModalWindow());
        },(error)=>{

        });
    }
}
export const CutFolderHandler = ()=>{
    return (dispatch, getState) => {
        const currentFolderId = getState().fileSystem.currentItemId;
        dispatch(setFolderNotAvailable(currentFolderId));
        dispatch(setReplaceFolderId(currentFolderId));
        dispatch(onGoToPrev());
    }
}
export const PasteFolderHandler = ()=>{
    return (dispatch, setState) => {
        const currentFolderId = setState().fileSystem.currentItemId;
        const replaceFolderId = setState().fileSystem.replaceFolderId;
        service.replaceFolder(replaceFolderId,currentFolderId).then((response)=>{
            console.log(response.data);
            dispatch(setFileSystemItems(response.data));
            dispatch(setFolderAvailable(replaceFolderId));
            dispatch(setReplaceFolderId(-1));
        },(error)=>{

        });
    }
}
export const renameTaskHandler = (taskName) => {
    return (dispatch, getState) => {
        const taskId = getState().fileSystem.taskOptionsPanel.optionsPanelIsOpenForTask;
        service.renameTask(taskName,taskId).then((response)=>{
            // console.log(response.data);
            dispatch(setTasks(response.data));
            dispatch(closeAllModalWindow());
        },(error)=>{

        });
    }
}
export const removeTaskHandler = ()=>{
    return (dispatch, getState) => {
        const taskId = getState().fileSystem.taskOptionsPanel.optionsPanelIsOpenForTask;
        if(!window.confirm("Remove task?"))return false;
        service.removeTask(taskId).then((response)=>{
            // console.log(response.data);
            dispatch(setTasks(response.data));

        },(error)=>{

        });
    }

}

export const taskClickHandler = (id) => {
    return (dispatch, getState) => {
        console.log(345);
        const tasks = getState().tasks.items;
        if(isTaskHaveStages(tasks, id)) dispatch(setIdTaskWithOpenStageList(id));
        else{
            dispatch(startTaskHandler(id));

        }
    }

};

export const startTaskHandler = (taskId, stageId)=>{
    return (dispatch, getState) => {
        const switchableTaskId = getState().ongoingTasks.switchableTaskId;
        dispatch(startTask(taskId));
        if(switchableTaskId !== -1){
            service.stopTask(switchableTaskId)
                .then((response) => {
                    dispatch(setSwitchableOngoingTask(taskId));
                    return service.getTimeTask();
                })
                .then( response => {
                    dispatch(setTimeTask(response.data));
                    return service.startTask(taskId, stageId);
                })
                .then((response) => {
                    console.log(response.data);
                    dispatch(setOngoingTasksHandler(response.data));
                }, (error) => {

                });

        }else{
            service.getTimeTask()
            .then( response => {
                dispatch(setTimeTask(response.data));
                return service.startTask(taskId, stageId);
            })
            .then((response) => {
                console.log(response.data);
                dispatch(setOngoingTasksHandler(response.data));
            }, (error) => {

            });
        }
    }

};



// utils
const isTaskHaveStages = (tasks, taskId) => {
    const item = tasks.find((item) => item.id === taskId);
    return item.stageItemIdx !== -1;

};