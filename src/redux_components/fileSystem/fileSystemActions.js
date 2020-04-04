import * as action_type from "../action_type";

export const onSerfing = (payload) => ({type:action_type.ON_SERFING, payload});
export const onGoToPrev = () => ({type:action_type.ON_GO_TO_PREV});
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
export const createNewTask = (payload) => {
    return (dispatch,getState)  => {
        const state = getState();
        payload.folderId = state.fileSystem.currentItemId;
        dispatch(setNewTask(payload));
        dispatch(closeAllModalWindow());

    }
};
export const increaseTemporaryIdForTask = () => ({type:action_type.INCREASE_TEMPORARY_ID_FOR_TASK});
export const changeStatusAndSetIdForTaskByTemporaryId = (payload) => ({type:action_type.CHANGE_STATUS_AND_SET_ID_FOR_TASK_BY_TEMPORARY_ID,payload});
export const startTask = (payload) => ({type:action_type.START_TASK,payload});
export const setTasks = (payload) => ({type: action_type.SET_TASKS,payload});