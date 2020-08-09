const initialState = {
    items:[],
    switchableTaskId:-1,
    isEnableSoundReminder: false,
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
        case 'ENABLE_SOUND_REMINDER':
            return {...ongoingTasks, isEnableSoundReminder: true};
        case 'DISABLE_SOUND_REMINDER':
            return {...ongoingTasks, isEnableSoundReminder: false};
        case 'SET_ONGOING_TASKS_TIMER_ID':
            return {...ongoingTasks, timerId: action.payload};
        default:
            return ongoingTasks;

    }
}

export default ongoingTasksReducer;