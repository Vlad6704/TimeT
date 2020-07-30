const initialState = {
    items:  [
        // {
        //     id:0,
        //     name:"work",
        //     parentsId:-1,
        //
        //
        // },
        //
        //
        // },

    ],
    currentItemId:-1,
    homeLevelId:-1,
    replaceFolderId:-1,
    isOpenCreateFolderForm:false,
    isOpenCreateTaskForm:false,
    isOpenRenameFolderForm:false,
    isOpenRenameTaskForm:false,
    idTaskWithOpenStageList:-1,
    taskOptionsPanel:{
        isOpen:false,
        optionsPanelIsOpenForTask:-1,

    }

};

const  fileSystemReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_FILE_SYSTEM_ITEMS':{
            const newState = {

                ...state,
                items: action.payload

            }
            return newState;

        }
        case 'ON_SERFING':{
            let id = action.payload;

            let newState = {
                ...state,
                currentItemId: id,
            }
            return newState;
        }
        case 'ON_GO_TO_PREV':{
            let id = -1;
            state.items.forEach((item)=> {
                if(item.id === state.currentItemId) id = item.parentsId
            });

            let newState = {
                ...state,
                currentItemId: id,
            }
            return newState;
        }
        case 'ON_GO_TO_HOME':{

            let newState = {
                ...state,
                currentItemId: state.homeLevelId,
            }
            return newState;
        }
        case 'OPEN_CREATE_FOLDER_FORM':{
            let newState = {
                ...state,
                isOpenCreateFolderForm: true,
            };

            return newState;
        }
        case 'CREATE_NEW_FOLDER':{
            const newFolderName = action.payload;
            let newFolderId;
            if(state.items.length > 0) newFolderId = state.items[state.items.length - 1].id + 1;
            else newFolderId = 0 ;

            const newItem = {
                id:newFolderId,
                name:newFolderName,
                children: [],
                parentsId:state.currentItemId,
                tasks:[],
            };
            let newState = {
                ...state,
                isOpenCreateFolderForm:false,
                items:[
                    ...state.items,
                    newItem
                ]
            }
            return newState;

        }
        case 'OPEN_RENAME_FOLDER_FORM':{
            const newState = {
                ...state,
                isOpenRenameFolderForm:true,
            }
            return newState;
        }
        case 'SET_FOLDER_NOT_AVAILABLE':{
            const folderId = action.payload;
            const newFileSysItems = state.items.map((item) => Object.assign({}, item));
            newFileSysItems.forEach((item) => {
                if(item.id === folderId)item['isNotAvailable'] = true;
            });
            const newState = {
                ...state,
                items:[
                    ...newFileSysItems,

                ]

            }
            return newState;
        }
        case 'SET_FOLDER_AVAILABLE':{
            const folderId = action.payload;
            const newFileSysItems = state.items.map((item) => Object.assign({}, item));
            newFileSysItems.forEach((item) => {
                if(item.id === folderId)item['isNotAvailable'] = false;
            });
            const newState = {
                ...state,
                items:[
                    ...newFileSysItems,

                ]
            }
            return newState;
        }
        case 'SET_REPLACE_FOLDER_ID':{
            // default: -1;
            const newState = {
                ...state,
                replaceFolderId:action.payload,
            }
            return newState;
        }
        case 'CLOSE_ALL_MODAL_WINDOW':{
            let newState = getfileSystemWithCloseModalWindow(state);

            return newState;
        }
        case 'OPEN_CREATE_NEW_TASK_FORM':{
            let newState = {
                ...state,
                isOpenCreateTaskForm: true,
            }
            return newState;
        }
        case 'OPEN_FI_SY_OPTIONS_PANEL':{
            // default: -1;
            const newState = {
                    ...state,
                    taskOptionsPanel:{
                        ...state.taskOptionsPanel,
                        isOpen:true,
                        optionsPanelIsOpenForTask:action.payload,

                    }
                }

            return newState;
        }
        case 'OPEN_RENAME_TASK_FORM': {
            const newState = {
                ...state,
                isOpenRenameTaskForm:true,
            }
            return newState;
        }
        case 'SET_ID_TASK_WITH_OPEN_STAGE_LIST': {
            const newState = {
                ...state,
                idTaskWithOpenStageList:action.payload,
            }
            return newState;
        }
        case 'CLOSE_TASK_OPTIONS_PANEL': {
            const newState = {
                ...state,
                taskOptionsPanel:{
                    ...state.taskOptionsPanel,
                    isOpen:false,

                }
            }
            return newState;
        }
        default:
            return state;
    }
}

const getfileSystemWithCloseModalWindow = (state)=>{
    return{
        ...state,
        isOpenCreateFolderForm:false,
        isOpenCreateTaskForm: false,
        isOpenRenameFolderForm:false,
        isOpenRenameTaskForm:false,
        idTaskWithOpenStageList: -1,
        taskOptionsPanel:{
            isOpen:false,
            optionsPanelIsOpenForTask:-1,
        },
    }
}



export default fileSystemReducer;