import {initialState} from './initialState';


const getFileSistemWithCloseModalWindow = (state)=>{
    return{
        ...state.fileSistem,
        isOpenCreateFolderForm:false,
        isOpenCreateTaskForm: false,
    }
}

const isValidNewFolderName = (folder_name) =>{
    return true;
}

const isValidFieldsNewTask = (field_obj)=>{
    return true;
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'OnSerfing':{
            let OldFileSistem = state.fileSistem;
            let id = action.payload;

            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    currentItemId: id,
                }
            }
            return newState;
        }
        case 'onGoToPrev':{
            let prevId = -1;
            state.fileSistem.items.forEach((item)=> {
                if(item.id === state.fileSistem.currentItemId) prevId = item.parentsId
            });

            let OldFileSistem = state.fileSistem;
            let id = prevId;

            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    currentItemId: id,
                }
            }
            return newState;
        }
        case 'onGoToHome':{

            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    currentItemId: state.fileSistem.homeLevelId,
                }
            }
            return newState;
        }
        case 'openCreateFolderForm':{
            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    isOpenCreateFolderForm: true,
                }
            }
            return newState;
        }
        case 'closeAllModalWindow':{
            let newState = {
                ...state,
                fileSistem: getFileSistemWithCloseModalWindow(state)
            }
            return newState;
        }
        case 'CreateNewFolder':{
            const newFolderName = action.payload;
            if(isValidNewFolderName(newFolderName)){
                const newtFolderId = state.fileSistem.items[state.fileSistem.items.length - 1].id + 1;
                
                const newItem = {
                    id:newtFolderId,
                    name:newFolderName,
                    children: [],
                    parentsId:state.fileSistem.currentItemId,
                    tasks:[],
                };
                let newState = {
                    ...state,
                    fileSistem: {
                        ...state.fileSistem,
                        isOpenCreateFolderForm:false,
                        items:[
                            ...state.fileSistem.items,
                            newItem
                        ]
                    }
                }
                return newState;
            }
            return state;
        }
        case 'openCreateNewTaskForm':{
            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    isOpenCreateTaskForm: true,
                }
            }
            return newState;
        }
        case 'CreateNewTask':{
            console.log(action.payload);
            if(isValidFieldsNewTask){
                const newtTaskrId = state.tasks[state.tasks.length - 1].id + 1;
                const newTask = {
                    id:newtTaskrId,
                    name: action.payload.titleNewTask,
                    description: action.payload.descriptionNewTask,
                    stages:action.payload.stageItems,
                    folderId: state.fileSistem.currentItemId,
                };
                let newState = {
                    ...state,
                    tasks: [
                        ...state.tasks,
                        newTask
                    ],
                    fileSistem:{
                        ...state.fileSistem,
                        isOpenCreateTaskForm: false,
                    }
                }
                return newState;
            }
            return state;
        }
        default:
            return state;
    }
}

export default reducer;