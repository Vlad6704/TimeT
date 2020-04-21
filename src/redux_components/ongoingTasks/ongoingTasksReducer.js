const initialState = {
    items:[],
    switchableTaskId:-1,
};

const ongoingTasksReducer = (ongoingTasks = initialState, action) => {
    switch (action.type) {
        case 'SET_ONGOING_TASKS':{
            const newState = {
                ...ongoingTasks,
                items:[
                    ...action.payload
                ]
            }
            return newState;

        }
        case 'START_TASK':{
            const newState = {
                ...ongoingTasks,
                items: [
                    ...ongoingTasks.items,
                    {
                        id: action.payload,
                        status: 'connecting',
                        ongoingTime: 0
                    }
                ]
            }
            return newState;
        }
        case 'SET_SWITCHABLE_ONGOING_TASK':{
            const newState = {
                ...ongoingTasks,
                switchableTaskId:action.payload,
            }
            return newState;
        }
        default:
            return ongoingTasks;

    }
}

export default ongoingTasksReducer;