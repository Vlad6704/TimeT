import React from 'react';
import {connect} from "react-redux";

const CurrentDateRangeSetUp = ({dateRange,currMeasure}) =>{

    const startDate = (
        <span className={'startDate'}>
            &nbsp;-&nbsp;
            {dateRange.startDate}
        </span>
    );
    const endDate = (
        <span className={'endDate'}>
            {dateRange.endDate}
        </span>
    );
    return (
        <div className={'current-date-range-setup'}>
            {dateRange.endDate &&
                endDate
            }
            {dateRange.startDate && currMeasure !== 'day' &&
                startDate
            }
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        dateRange: state.statistics.dateRange,
        currMeasure:state.statistics.dateRange.currMeasure,
    }
}

export default connect(mapStateToProps)(CurrentDateRangeSetUp);