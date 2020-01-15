import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/actions";
import moment from "moment";


const NavPanel = ({startDate,endDate,isIntegerMeasure,currMeasure,setDateRangeStartDate,setDateRangeEndDate}) =>{
    const prevHandler = ()=>{
        let newStartDate = startDate;
        let newEndDate = endDate;
        if(currMeasure === 'day'){
             newStartDate = moment(startDate,'DD-MM-YYYY').subtract(1, 'days').format('DD.MM.YYYY');

        }
        if(currMeasure === 'week'){
             newStartDate = moment(startDate,'DD-MM-YYYY').subtract(7, 'days').format('DD.MM.YYYY');
             newEndDate = moment(endDate,'DD-MM-YYYY').subtract(7, 'days').format('DD.MM.YYYY');

        }
        if(currMeasure === 'month'){

            if(isIntegerMeasure){
                newStartDate = moment(startDate,'DD-MM-YYYY').subtract(1, 'month').format('DD.MM.YYYY');
                const dayInCurrMonth = moment(newStartDate, 'DD-MM-YYYY').daysInMonth();
                newStartDate = moment(newStartDate, 'DD-MM-YYYY').date(dayInCurrMonth).format("DD.MM.YYYY");
                newEndDate = moment(endDate,'DD-MM-YYYY').subtract(1, 'month').format('DD.MM.YYYY');
            }else{
                newStartDate = moment(newStartDate, 'DD-MM-YYYY').subtract(1,'month').format("DD.MM.YYYY");
                newEndDate = moment(endDate,'DD-MM-YYYY').subtract(1, 'month').format('DD.MM.YYYY');
            }
        }
        setDateRangeStartDate(newStartDate);
        setDateRangeEndDate(newEndDate);
    }
    const nextHandler = () => {
        let newStartDate = startDate;
        let newEndDate = endDate;
        if(currMeasure === 'day'){
            newStartDate = moment(startDate,'DD-MM-YYYY').add(1, 'days').format('DD.MM.YYYY');

        }
        if(currMeasure === 'week'){
            newStartDate = moment(startDate,'DD-MM-YYYY').add(7, 'days').format('DD.MM.YYYY');
            newEndDate = moment(endDate,'DD-MM-YYYY').add(7, 'days').format('DD.MM.YYYY');
        }
        if(currMeasure === 'month'){
            if(isIntegerMeasure){
                newStartDate = moment(startDate,'DD-MM-YYYY').add(1, 'month').format('DD.MM.YYYY');
                const dayInCurrMonth = moment(newStartDate, 'DD-MM-YYYY').daysInMonth();
                newStartDate = moment(newStartDate, 'DD-MM-YYYY').date(dayInCurrMonth).format("DD.MM.YYYY");
                newEndDate = moment(endDate,'DD-MM-YYYY').add(1, 'month').format('DD.MM.YYYY');
            }else{
                newStartDate = moment(newStartDate, 'DD-MM-YYYY').add(1,'month').format("DD.MM.YYYY");
                newEndDate = moment(endDate,'DD-MM-YYYY').add(1, 'month').format('DD.MM.YYYY');
            }

        }
        setDateRangeStartDate(newStartDate);
        setDateRangeEndDate(newEndDate);
    }
    return (
        <div className={'navPanel'}>
            <div className={'cursPointSelNon nav prev'} onClick={prevHandler}>
                Prev
            </div>
            <div className={'cursPointSelNon nav next'} onClick={nextHandler}>
                Next
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        firstDayOfTheWeek:state.app_options.firstDayOfTheWeek,
        isIntegerMeasure:state.statistic.dateRange.isIntegerMeasure,
        dateRange:state.statistic.dateRange,
        startDate:state.statistic.dateRange.startDate,
        endDate:state.statistic.dateRange.endDate,
        currMeasure:state.statistic.dateRange.currMeasure,
    }
}
export default connect(mapStateToProps,actions)(NavPanel);