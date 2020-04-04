import * as action_type from "../action_type";

export const setDateRange = (payload) => ({type:action_type.SET_DATE_RANGE,payload});
export const setDateRangeStartDate = (payload) => ({type:action_type.SET_DATE_RANGE_START_DATE,payload});
export const setDateRangeEndDate = (payload) => ({type:action_type.SET_DATE_RANGE_END_DATE,payload});
export const setStatChartsTaskArr = (payload) => ({type:action_type.SET_STAT_CHARTS_TASK_ARR,payload});
export const pushOrRemIdForStatChartTaskArr = (payload) => ({type:action_type.PUSH_OR_REM_ID_FOR_STAT_CHART_TASK_ARR,payload});