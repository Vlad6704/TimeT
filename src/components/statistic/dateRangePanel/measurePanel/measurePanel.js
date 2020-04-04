import React from 'react';
import {connect} from "react-redux";
import './measurePanel.css';
import * as actions from "../../../../redux_components/statistics/statisticsActions";
import moment from "moment";

const MeasurePanel = ({currMeasure,dateRange,startDate,endDate,setDateRange,isIntegerMeasure,firstDayOfTheWeek,setDateRangeStartDate,setDateRangeEndDate}) =>{
    const measureBoxHandler = (measure)=>{

        const newDateRange = {
            ...dateRange,
            currMeasure:measure,
        }
        setDateRange(newDateRange);
        getEndDate(measure);
    }
    const getEndDate = (measure)=>{
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
        setDateRangeStartDate(newStartDate);
        setDateRangeEndDate(newEndDate);

    }
    const measureSwitcherHandler = ()=>{
        const newDateRange = {
            ...dateRange,
            isIntegerMeasure: !isIntegerMeasure,
        }
        setDateRange(newDateRange);
    }
    return (
        <div className={'measurePanel'}>
            <div className={'measureBoxItems'}>
                <div className={`measureBox cursPointSelNon ${currMeasure === 'day'?'active':''}`} onClick={()=>measureBoxHandler('day')}>
                    day
                </div>
                <div className={`measureBox cursPointSelNon ${currMeasure === 'week'?'active':''}`} onClick={()=>measureBoxHandler('week')}>
                    week
                </div>
                <div className={`measureBox cursPointSelNon ${currMeasure === 'month'?'active':''}`} onClick={()=>measureBoxHandler('month')}>
                    month
                </div>
            </div>
            <div className={`measureSwitcher cursPointSelNon ${isIntegerMeasure && 'active'}`} onClick={measureSwitcherHandler}>
                is Integer Measure? {isIntegerMeasure && 'Yes'}
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        firstDayOfTheWeek:state.appOptions.firstDayOfTheWeek,
        startDate:state.statistics.dateRange.startDate,
        endDate:state.statistics.dateRange.endDate,
        isIntegerMeasure:state.statistics.dateRange.isIntegerMeasure,
        dateRange:state.statistics.dateRange,
        currMeasure:state.statistics.dateRange.currMeasure,
    }
}

export default connect(mapStateToProps,actions)(MeasurePanel);