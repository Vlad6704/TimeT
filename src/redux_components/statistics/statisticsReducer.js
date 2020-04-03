const initialState = {
    timeTaskArr:[],
    charts:{
        foldersArr:[],
        tasksArr:[]
    },
    dateRange:{
        startDate:null,
        endDate:null,
        currMeasure:'day',
        isIntegerMeasure:false,

    },
    statFileSystem:{

    }
}

const statisticsReducer = (statistics = initialState, action) => {
    switch (action.type) {
        case 'SET_TIME_TASK':{
            const newState = {
                ...statistics,
                timeTaskArr:action.payload
            }
            return newState;
        }
        case 'SET_DATE_RANGE':{
            const newState = {
                ...statistics,
                dateRange:action.payload
            }
            return newState;
        }
        case 'SET_DATE_RANGE_START_DATE':{
            const newState = {
                ...statistics,
                dateRange:{
                    ...statistics.dateRange,
                    startDate:action.payload
                }
            }
            return newState;
        }
        case 'SET_DATE_RANGE_END_DATE':{
            const newState = {
                ...statistics,
                dateRange:{
                    ...statistics.dateRange,
                    endDate:action.payload
                }
            }
            return newState;
        }
        case 'SET_STAT_CHARTS_TASK_ARR':{
            const newState = {
                ...statistics,
                charts:{
                    ...statistics.charts,
                    tasksArr:action.payload
                }
            }
            return newState;
        }
        case 'PUSH_OR_REM_ID_FOR_STAT_CHART_TASK_ARR':{
            const newIdChartTask = action.payload;
            const chartTaskArr = statistics.charts.tasksArr;
            const idxNewId = chartTaskArr.indexOf(newIdChartTask);

            if(idxNewId !== -1){
                const newState = {
                    ...statistics,
                    charts:{
                        ...statistics.charts,
                        tasksArr:[...chartTaskArr.slice(0,idxNewId),...chartTaskArr.slice(idxNewId+1)],
                    }
                }
                return newState;
            }else{
                const newState = {
                    ...statistics,
                    charts:{
                        ...statistics.charts,
                        tasksArr:[...chartTaskArr,newIdChartTask],
                    }
                }
                return newState;
            }
        }

        default:
            return statistics;
    }
}

export default statisticsReducer;