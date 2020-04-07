const initialState = {
    items: [],
    switchableTaskId:-1,
    newTemporaryIdForNewTask: 0,
};

 const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TASKS':{
            const newState = {
                ...state,
                items: action.payload

            };

            return newState;

        }
        case 'CHANGE_STATUS_AND_SET_ID_FOR_TASK_BY_TEMPORARY_ID':{
            const {temporaryId, status, id} = action.payload;
            const tasksArr = [...state.items];
            let taskIdx = getIndexTaskByTemporaryId(state, temporaryId);
            let task = state.items[taskIdx];
            delete task.temporaryId;
            task.id = id;
            task.status = status;
            tasksArr.splice(taskIdx ,1);

            const newState = {
                ...state,
                items: [
                    ...tasksArr,
                    task
                ]
            };

            return newState;
        }
        case 'CREATE_NEW_TASK':{
            const ObjFormVal = action.payload.getObjFormVal;

            const temporaryId = action.payload.temporaryId;
            const folderId = action.payload.folderId;
            const newTask = {
                temporaryId:temporaryId,
                status: 'creating',
                name: ObjFormVal.name,
                description: ObjFormVal.description,
                stages:ObjFormVal.stages,
                folderId: folderId,
                stageLastId: ObjFormVal.stageItemIdx
            };
            const newState = {
                ...state,
                items: [
                    ...state.items,
                    newTask
                ]

            };

            return newState;
        }
        case 'INCREASE_TEMPORARY_ID_FOR_TASK': {
            const newState = {
                ...state,
                newTemporaryIdForNewTask: state.newTemporaryIdForNewTask + 1,

            };
            return newState;
        }
        default :
            return state;
    }
}


const getIndexTaskByTemporaryId = (state,temporaryId) =>{

    return state.items.findIndex((item) =>{
        return item.temporaryId == temporaryId
    })
}

export default tasksReducer;