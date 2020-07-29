import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/statistics/statisticsActions";
import moment from "moment";
import CurrentDateRangeSetUp from "../currentDateRangeSetUp/currentDateRangeSetUp";


const NavPanel = ({startDate,endDate,isIntegerMeasure,currMeasure,setDateRangeStartDate,setDateRangeEndDate, prevHandler,nextHandler}) =>{


    return (
        <div className={'stat-nav-panel'}>
            <div className={'button stat-nav-panel__item stat-nav-panel__prev'} onClick={prevHandler}>
                <i className={"icon-left-arrow stat-nav-panel__item-icon"} ></i>
            </div>

            <CurrentDateRangeSetUp />

            <div className={'button stat-nav-panel__item stat-nav-panel__next'} onClick={nextHandler}>
                <i className={"icon-right-arrow stat-nav-panel__item-icon"} ></i>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{

    }
}
export default connect(mapStateToProps,actions)(NavPanel);