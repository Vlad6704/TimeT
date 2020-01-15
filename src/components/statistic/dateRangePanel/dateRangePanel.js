import React from 'react';
import MeasurePanel from './measurePanel/measurePanel';
import NavPanel from './navPanel/navPanel';
import CurrentDateRangeSetUp from './currentDateRangeSetUp/currentDateRangeSetUp';
import moment from 'moment';
import {connect} from "react-redux";
import * as actions from "../../../redux_components/actions";

class DateRangePanel extends React.Component {

    componentDidMount(){
        const {setDateRange} = this.props;
        const initialDateRange = {
            startDate:moment().format("DD.MM.YYYY"),
            endDate:null,
            currMeasure:'day',
        }
        setDateRange(initialDateRange);
    }

    render(){

        return(
            <div className={'dateRangePanel'}>
                <MeasurePanel />
                <CurrentDateRangeSetUp />
                <NavPanel />
            </div>
        )

    }

}

const mapStateToProps = (state) =>{
    return {
        dateRange: state.statistic.dateRange,

    }
}


export default connect(mapStateToProps,actions)(DateRangePanel);