import React from 'react';
import {connect} from "react-redux";
import './measurePanel.css';
import * as actions from "../../../../redux_components/statistics/statisticsActions";

const MeasurePanel = ({currMeasure,isIntegerMeasure, measureSwitcherHandler,measureBoxHandler}) =>{


    return (
        <div className={'measure-panel'}>
            <div className={'measure-box-items'}>
                <div className={`measure-box button ${currMeasure === 'day'?'measure-box_active':''}`} onClick={()=>measureBoxHandler('day')}>
                    day
                </div>
                <div className={`measure-box button ${currMeasure === 'week'?'measure-box_active':''}`} onClick={()=>measureBoxHandler('week')}>
                    week
                </div>
                <div className={`measure-box button ${currMeasure === 'month'?'measure-box_active':''}`} onClick={()=>measureBoxHandler('month')}>
                    month
                </div>
            </div>
            <div className={`measure-switcher button ${isIntegerMeasure ? 'measure-switcher_active':''}`} onClick={measureSwitcherHandler}>
                <div className={"measure-switcher__check"}>
                    <i className={"icon-correct measure-switcher__check-icon"}></i>
                </div>
                    Integer
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        isIntegerMeasure:state.statistics.dateRange.isIntegerMeasure,
        currMeasure:state.statistics.dateRange.currMeasure,
    }
}

export default connect(mapStateToProps,actions)(MeasurePanel);