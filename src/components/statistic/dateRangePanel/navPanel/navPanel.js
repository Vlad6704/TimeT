import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/statistics/statisticsActions";
import moment from "moment";


const NavPanel = ({startDate,endDate,isIntegerMeasure,currMeasure,setDateRangeStartDate,setDateRangeEndDate, prevHandler,nextHandler}) =>{


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

    }
}
export default connect(mapStateToProps,actions)(NavPanel);