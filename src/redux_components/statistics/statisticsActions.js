import * as action_type from "../action_type";
import moment from "moment";

export const setDateRange = (payload) => ({type:action_type.SET_DATE_RANGE,payload});
export const setDateRangeStartDate = (payload) => ({type:action_type.SET_DATE_RANGE_START_DATE,payload});
export const setDateRangeEndDate = (payload) => ({type:action_type.SET_DATE_RANGE_END_DATE,payload});
export const setStatChartsTaskArr = (payload) => ({type:action_type.SET_STAT_CHARTS_TASK_ARR,payload});
export const pushOrRemIdForStatChartTaskArr = (payload) => ({type:action_type.PUSH_OR_REM_ID_FOR_STAT_CHART_TASK_ARR,payload});
export const setArrStatOpenFolderIds = (newArrStatOpenFolderIds) => ({type:action_type.SET_ARR_STAT_OPEN_FOLDER_IDS, payload:newArrStatOpenFolderIds});

export const folderClickHandler = (e,folderId) =>{
    e.stopPropagation();

    return (dispatch, getState) => {
        const arrStatOpenFolderIds = getState().statistics.arrStatOpenFolderIds;
        let newarrStatOpenFolderIds;
        const idxFolderId = arrStatOpenFolderIds.indexOf(folderId);

        if(idxFolderId === -1) newarrStatOpenFolderIds = [...arrStatOpenFolderIds,folderId ];
        else {
            newarrStatOpenFolderIds = [...arrStatOpenFolderIds.slice(0,idxFolderId),...arrStatOpenFolderIds.slice(idxFolderId+1)];
        }
        dispatch(setArrStatOpenFolderIds(newarrStatOpenFolderIds));
    }
}
export const prevHandler = ()=>{
    return (dispatch, getState) => {
        const isIntegerMeasure = getState().statistics.dateRange.isIntegerMeasure;
        const startDate = getState().statistics.dateRange.startDate;
        const endDate = getState().statistics.dateRange.endDate;
        const currMeasure = getState().statistics.dateRange.currMeasure;
        let newStartDate = startDate;
        let newEndDate = endDate;
        if(currMeasure === 'day'){
            newEndDate = moment(endDate,'DD-MM-YYYY').subtract(1, 'days').format('DD.MM.YYYY');

        }
        if(currMeasure === 'week'){
            newStartDate = moment(startDate,'DD-MM-YYYY').subtract(7, 'days').format('DD.MM.YYYY');
            newEndDate = moment(endDate,'DD-MM-YYYY').subtract(7, 'days').format('DD.MM.YYYY');

        }
        if(currMeasure === 'month'){

            if(isIntegerMeasure){
                newEndDate = moment(endDate,'DD-MM-YYYY').subtract(1, 'month').format('DD.MM.YYYY');
                const dayInCurrMonth = moment(newEndDate, 'DD-MM-YYYY').daysInMonth();
                newEndDate = moment(newEndDate, 'DD-MM-YYYY').date(dayInCurrMonth).format("DD.MM.YYYY");
                newStartDate = moment(startDate,'DD-MM-YYYY').subtract(1, 'month').format('DD.MM.YYYY');
            }else{
                newEndDate = moment(newEndDate, 'DD-MM-YYYY').subtract(1,'month').format("DD.MM.YYYY");
                newStartDate = moment(startDate,'DD-MM-YYYY').subtract(1, 'month').format('DD.MM.YYYY');
            }
        }
        dispatch(setDateRangeStartDate(newStartDate));
        dispatch(setDateRangeEndDate(newEndDate));
    }
}
export const nextHandler = () => {
    return (dispatch, getState) => {
        const isIntegerMeasure = getState().statistics.dateRange.isIntegerMeasure;
        const startDate = getState().statistics.dateRange.startDate;
        const endDate = getState().statistics.dateRange.endDate;
        const currMeasure = getState().statistics.dateRange.currMeasure;
        let newStartDate = startDate;
        let newEndDate = endDate;
        if(currMeasure === 'day'){
            newEndDate = moment(endDate,'DD-MM-YYYY').add(1, 'days').format('DD.MM.YYYY');

        }
        if(currMeasure === 'week'){
            newStartDate = moment(startDate,'DD-MM-YYYY').add(7, 'days').format('DD.MM.YYYY');
            newEndDate = moment(endDate,'DD-MM-YYYY').add(7, 'days').format('DD.MM.YYYY');
        }
        if(currMeasure === 'month'){
            if(isIntegerMeasure){
                newEndDate = moment(endDate,'DD-MM-YYYY').add(1, 'month').format('DD.MM.YYYY');
                const dayInCurrMonth = moment(newEndDate, 'DD-MM-YYYY').daysInMonth();
                newEndDate = moment(newEndDate, 'DD-MM-YYYY').date(dayInCurrMonth).format("DD.MM.YYYY");
                newStartDate = moment(startDate,'DD-MM-YYYY').add(1, 'month').format('DD.MM.YYYY');
            }else{
                newEndDate = moment(endDate, 'DD-MM-YYYY').add(1,'month').format("DD.MM.YYYY");
                newStartDate = moment(startDate,'DD-MM-YYYY').add(1, 'month').format('DD.MM.YYYY');
            }

        }
        dispatch(setDateRangeStartDate(newStartDate));
        dispatch(setDateRangeEndDate(newEndDate));
    }
}
export const measureSwitcherHandler = ()=>{
    return (dispatch, getState) => {
        const dateRange = getState().statistics.dateRange;
        const isIntegerMeasure = getState().statistics.dateRange.isIntegerMeasure;
        const newDateRange = {
            ...dateRange,
            isIntegerMeasure: !isIntegerMeasure,
        }
        dispatch(setDateRange(newDateRange));
    }
}
export const measureBoxHandler = (measure)=>{
    return (dispatch, getState) => {
        const firstDayOfTheWeek = getState().appOptions.firstDayOfTheWeek;
        const startDate = getState().statistics.dateRange.startDate;
        const endDate = getState().statistics.dateRange.endDate;
        const isIntegerMeasure = getState().statistics.dateRange.isIntegerMeasure;
        const dateRange = getState().statistics.dateRange;
        const newDateRange = {
            ...dateRange,
            currMeasure:measure,
        }
        dispatch(setDateRange(newDateRange));
        const newStartEndDate = getNewStartEndDate(measure, startDate, endDate, isIntegerMeasure, firstDayOfTheWeek);
        dispatch(setDateRangeStartDate(newStartEndDate.newStartDate));
        dispatch(setDateRangeEndDate(newStartEndDate.newEndDate));
    }

}










//utils
const getNewStartEndDate = (measure, startDate, endDate, isIntegerMeasure, firstDayOfTheWeek)=>{
    let newStartDate = startDate;
    let newEndDate = endDate;
    if(measure === 'day') newStartDate = null;
    if(measure === 'week') {
        if(isIntegerMeasure){
            newEndDate = moment(endDate, 'DD-MM-YYYY').weekday(firstDayOfTheWeek + 6).format("DD.MM.YYYY");
            newStartDate = moment(endDate, 'DD-MM-YYYY').weekday(firstDayOfTheWeek).format("DD.MM.YYYY");

        }else{
            newStartDate = moment(endDate, 'DD-MM-YYYY').subtract(6,'days').format("DD.MM.YYYY");
        }
    }
    if(measure === 'month'){
        if(isIntegerMeasure){
            const dayInCurrMonth = moment(endDate, 'DD-MM-YYYY').daysInMonth();
            newEndDate = moment(endDate, 'DD-MM-YYYY').date(dayInCurrMonth).format("DD.MM.YYYY");
            newStartDate = moment(endDate, 'DD-MM-YYYY').date(1).format("DD.MM.YYYY");
        }else{
            newStartDate = moment(endDate, 'DD-MM-YYYY').subtract(1,'month').format("DD.MM.YYYY");
        }
    }
    return {
        newStartDate,
        newEndDate
    }


}