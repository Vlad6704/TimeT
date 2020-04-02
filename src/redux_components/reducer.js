import {initialState} from './initialState';


const getFileSistemWithCloseModalWindow = (state)=>{
    return{
        ...state.fileSistem,
        isOpenCreateFolderForm:false,
        isOpenCreateTaskForm: false,
        isOpenRenameFolderForm:false,
        taskOptionsPanel:{
            optionsPanelIsOpenForTask:-1,
        },
    }
}

const isValidNewFolderName = (folder_name) =>{
    return true;
}

const isValidFieldsNewTask = (field_obj)=>{
    return true;
}

const getTaskByTemporaryId = (state,temporaryId) =>{

    return state.tasks.find((item) =>{
        return item.temporaryId == temporaryId
    })
}
const getIndexTaskByTemporaryId = (state,temporaryId) =>{

    return state.tasks.findIndex((item) =>{
        return item.temporaryId == temporaryId
    })
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'ON_SERFING':{
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
        case 'ON_GO_TO_PREV':{
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
        case 'ON_GO_TO_HOME':{

            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    currentItemId: state.fileSistem.homeLevelId,
                }
            }
            return newState;
        }
        case 'OPEN_CREATE_FOLDER_FORM':{
            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    isOpenCreateFolderForm: true,
                }
            }
            return newState;
        }
        case 'CLOSE_ALL_MODAL_WINDOW':{
            let newState = {
                ...state,
                fileSistem: getFileSistemWithCloseModalWindow(state)
            }
            return newState;
        }
        case 'CREATE_NEW_FOLDER':{
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
        case 'OPEN_CREATE_NEW_TASK_FORM':{
            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    isOpenCreateTaskForm: true,
                }
            }
            return newState;
        }
        case 'CREATE_NEW_TASK':{
            const ObjFormVal = action.payload.getObjFormVal;
            if(isValidFieldsNewTask){
                const temporaryId = action.payload.temporaryId;
                const newTask = {
                    temporaryId:temporaryId,
                    status: 'creating',
                    name: ObjFormVal.name,
                    description: ObjFormVal.description,
                    stages:ObjFormVal.stages,
                    folderId: state.fileSistem.currentItemId,
                    stageLastId: ObjFormVal.stageItemIdx
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
        case 'CHANGE_STATUS_AND_SET_ID_FOR_TASK_BY_TEMPORARY_ID':{
            const {temporaryId, status, id} = action.payload;
            const tasksArr = [...state.tasks];
            let taskIdx = getIndexTaskByTemporaryId(state, temporaryId);
            let task = state.tasks[taskIdx];
            delete task.temporaryId;
            task.id = id;
            task.status = status;
            tasksArr.splice(taskIdx ,1);


            let newState = {
                ...state,
                tasks: [
                    ...tasksArr,
                    task
                ],
            }
            console.log(newState);
            return newState;
        }
        case 'SET_TASKS':{
            const newState = {
                ...state,
                tasks:action.payload
            }
            return newState;

        }
        case 'SET_FILE_SYSTEM_ITEMS':{
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    items: action.payload
                }
            }
            return newState;

        }
        case 'SET_STORE':{
            let tasks;
            let fileSystemItems;
            let ongoingTasksArr;
            if(action.payload.tasks) tasks = JSON.parse(action.payload.tasks);
            else  tasks = [];
            if(action.payload.fileSystem) fileSystemItems = JSON.parse(action.payload.fileSystem);
            else fileSystemItems = [];
            if(action.payload.activeTask) ongoingTasksArr = action.payload.activeTask;
            else ongoingTasksArr = [];
            const newState = {
                ...state,
                tasks,
                fileSistem:{
                    ...state.fileSistem,
                    items: fileSystemItems
                },
                ongoingTasksArr
            }
            return newState;

        }
        case 'START_TASK':{
            const newState = {
                ...state,
                ongoingTasksArr: [
                    ...state.ongoingTasksArr,
                    {
                        id: action.payload,
                        status: 'connecting',
                        ongoingTime: 0
                    }
                ]
            }
            return newState;
        }
        case 'INCREASE_TEMPORARY_ID_FOR_TASK': {
            const newState = {
                ...state,
                other_inf:{
                    ...state.other_inf,
                    newTemporaryIdForNewTask: state.other_inf.newTemporaryIdForNewTask + 1,
                }
            }
            return newState;
        }
        case 'SET_ONGOING_TASKS':{
            const newState = {
                ...state,
                ongoingTasksArr:[
                    ...action.payload
                ]
            }
            return newState;

        }
        case 'SET_TIME_TASK':{
            const newState = {
                ...state,
                timeTaskArr:action.payload
            }
            return newState;
        }
        case 'SET_SWITCHABLE_ONGOING_TASK':{
            const newState = {
                ...state,
                other_inf:{
                    ...state.other_inf,
                    switchableTaskId:action.payload,
                }
            }
            return newState;
        }
        case 'SET_DATE_RANGE':{
                const newState = {
                    ...state,
                    statistic:{
                        ...state.statistic,
                        dateRange:action.payload

                    }
                }
                return newState;
        }
        case 'SET_DATE_RANGE_START_DATE':{
                const newState = {
                    ...state,
                    statistic:{
                        ...state.statistic,
                        dateRange:{
                            ...state.statistic.dateRange,
                            startDate:action.payload
                        }

                    }
                }
                return newState;
        }
        case 'SET_DATE_RANGE_END_DATE':{
                const newState = {
                    ...state,
                    statistic:{
                        ...state.statistic,
                        dateRange:{
                            ...state.statistic.dateRange,
                            endDate:action.payload
                        }

                    }
                }
                return newState;
        }
        case 'SET_STAT_CHARTS_TASK_ARR':{
                const newState = {
                    ...state,
                    statistic:{
                        ...state.statistic,
                        charts:{
                            ...state.statistic.charts,
                            tasksArr:action.payload
                        }

                    }
                }
                return newState;
        }
        case 'PUSH_OR_REM_ID_FOR_STAT_CHART_TASK_ARR':{
                const newIdChartTask = action.payload;
                const chartTaskArr = state.statistic.charts.tasksArr;
                const idxNewId = chartTaskArr.indexOf(newIdChartTask);

                if(idxNewId !== -1){
                    const newState = {
                        ...state,
                        statistic:{
                            ...state.statistic,
                            charts:{
                                ...state.statistic.charts,
                                tasksArr:[...chartTaskArr.slice(0,idxNewId),...chartTaskArr.slice(idxNewId+1)],
                            }

                        }
                    }
                    return newState;
                }else{
                    const newState = {
                        ...state,
                        statistic:{
                            ...state.statistic,
                            charts:{
                                ...state.statistic.charts,
                                tasksArr:[...chartTaskArr,newIdChartTask],
                            }

                        }
                    }
                    return newState;
                }
                return state;
        }
        case 'OPEN_RENAME_FOLDER_FORM':{
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    isOpenRenameFolderForm:true,
                }
            }
            return newState;
        }
        case 'SET_FOLDER_NOT_AVAILABLE':{
            const folderId = action.payload;
            const newFileSysItems = state.fileSistem.items.map((item) => Object.assign({}, item));
            newFileSysItems.forEach((item) => {
               if(item.id === folderId)item['isNotAvailable'] = true;
            });
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    items:[
                        ...newFileSysItems,

                    ]
                }
            }
            return newState;
        }
        case 'SET_FOLDER_AVAILABLE':{
            const folderId = action.payload;
            const newFileSysItems = state.fileSistem.items.map((item) => Object.assign({}, item));
            newFileSysItems.forEach((item) => {
               if(item.id === folderId)item['isNotAvailable'] = false;
            });
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    items:[
                        ...newFileSysItems,

                    ]
                }
            }
            return newState;
        }
        case 'SET_REPLACE_FOLDER_ID':{
            // default: -1;
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    replaceFolderId:action.payload,
                }
            }
            return newState;
        }
        case 'OPEN_FI_SY_OPTIONS_PANEL':{
            // default: -1;
            const newState = {
                ...state,
                fileSistem:{
                    ...state.fileSistem,
                    taskOptionsPanel:{
                        ...state.fileSistem.taskOptionsPanel,
                        optionsPanelIsOpenForTask:action.payload,

                    }
                }
            }
            return newState;
        }
        default:
            return state;
    }
}

export default reducer;