import React from 'react';
import {connect} from "react-redux";
import './measurePanel.css';
import * as actions from "../../../../redux_components/actions";
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
        if(measure === 'day') newEndDate = null;
        if(measure === 'week') {
            if(isIntegerMeasure){
                newStartDate = moment(startDate, 'DD-MM-YYYY').weekday(firstDayOfTheWeek + 6).format("DD.MM.YYYY");
                newEndDate = moment(startDate, 'DD-MM-YYYY').weekday(firstDayOfTheWeek).format("DD.MM.YYYY");

            }else{
                newEndDate = moment(startDate, 'DD-MM-YYYY').subtract(6,'days').format("DD.MM.YYYY");
            }
        }
        if(measure === 'month'){
            if(isIntegerMeasure){
                const dayInCurrMonth = moment(startDate, 'DD-MM-YYYY').daysInMonth();
                newStartDate = moment(startDate, 'DD-MM-YYYY').date(dayInCurrMonth).format("DD.MM.YYYY");
                newEndDate = moment(startDate, 'DD-MM-YYYY').date(1).format("DD.MM.YYYY");
            }else{
                newEndDate = moment(startDate, 'DD-MM-YYYY').subtract(1,'month').format("DD.MM.YYYY");
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
        firstDayOfTheWeek:state.app_options.firstDayOfTheWeek,
        startDate:state.statistic.dateRange.startDate,
        endDate:state.statistic.dateRange.endDate,
        isIntegerMeasure:state.statistic.dateRange.isIntegerMeasure,
        dateRange:state.statistic.dateRange,
        currMeasure:state.statistic.dateRange.currMeasure,
    }
}

export default connect(mapStateToProps,actions)(MeasurePanel);