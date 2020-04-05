import React from 'react';
import {connect} from "react-redux";
import './measurePanel.css';
import * as actions from "../../../../redux_components/statistics/statisticsActions";
import moment from "moment";

const MeasurePanel = ({currMeasure,isIntegerMeasure, measureSwitcherHandler,measureBoxHandler}) =>{


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
        isIntegerMeasure:state.statistics.dateRange.isIntegerMeasure,
        currMeasure:state.statistics.dateRange.currMeasure,
    }
}

export default connect(mapStateToProps,actions)(MeasurePanel);