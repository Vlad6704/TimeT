import React from 'react';
import {connect} from "react-redux";

const CurrentDateRangeSetUp = ({dateRange,currMeasure}) =>{

    const startDate = (
        <p className={'startDate'}>
            {dateRange.startDate}
        </p>
    );
    const endDate = (
        <p className={'endDate'}>
            {dateRange.endDate}
        </p>
    );
    return (
        <div className={'currentDateRangeSetUp'}>
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
        dateRange: state.statistic.dateRange,
        currMeasure:state.statistic.dateRange.currMeasure,
    }
}

export default connect(mapStateToProps)(CurrentDateRangeSetUp);