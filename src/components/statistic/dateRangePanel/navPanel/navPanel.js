import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/actions";
import moment from "moment";


const NavPanel = ({startDate,endDate,isIntegerMeasure,currMeasure,setDateRangeStartDate,setDateRangeEndDate}) =>{
    const prevHandler = ()=>{
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
        setDateRangeStartDate(newStartDate);
        setDateRangeEndDate(newEndDate);
    }
    const nextHandler = () => {
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
        firstDayOfTheWeek:state.appOptions.firstDayOfTheWeek,
        isIntegerMeasure:state.statistics.dateRange.isIntegerMeasure,
        dateRange:state.statistics.dateRange,
        startDate:state.statistics.dateRange.startDate,
        endDate:state.statistics.dateRange.endDate,
        currMeasure:state.statistics.dateRange.currMeasure,
    }
}
export default connect(mapStateToProps,actions)(NavPanel);