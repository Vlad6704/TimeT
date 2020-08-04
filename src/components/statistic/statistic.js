import React,{Component} from 'react';
import WithService from "../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../redux_components/statistics/statisticsActions";
import PropTypes from 'prop-types';
import TimeStat from './timeStatistic_class/timeStat';
import StatFileSystem from './statFileSystem/statFileSystem';
import DateRangePanel from './dateRangePanel/dateRangePanel';
import LineChart from './charts/lineChart/lineChart';
import getDataForLineChart from './charts/lineChart/getDataForLineChart';
import OngoingTasks from "../ongoingTasks/ongoingTasks";
import './statistic.css'
import RegularTools from '../regularTools/regularTools';
import ToolPanel from "../toolPanel/toolPanel";
import {setTimeTask} from "../../redux_components/ongoingTasks/ongoingTasksActions";
import {bindActionCreators} from "redux";

class Statistic extends Component{
    constructor( props) {
        super(props);
        this.timeStat = new TimeStat(props.timeTaskArr,props.app_options.timeShift );
    }
    componentDidMount() {
        const {service, setTimeTask} = this.props;
        service.getTimeTask().then((response) => {
            setTimeTask(response.data);

        },(error)=>{

        })

    }
    getTaskById(id, tasks){
        return tasks.find((item) =>{
            return item.id == id
        })
    }


    render(){
        const { timeTaskArr, app_options, tasks,statisticObj, chartsArr} = this.props;


        if( Array.isArray(timeTaskArr) &&  Array.isArray(tasks) && tasks.length > 0){
            return (
                <section className={'statistic'}>
                    <OngoingTasks/>

                    <StatFileSystem />
                    {chartsArr.length > 0 &&
                        <div className={'stat-chart'}>
                            <LineChart data={new getDataForLineChart(statisticObj,tasks,new TimeStat(timeTaskArr,app_options.timeShift )).getData()} />
                        </div>
                    }

                    <ToolPanel>
                        <div className={"statistic-tool-panel"}>
                            <DateRangePanel />
                            <RegularTools />
                        </div>
                    </ToolPanel>
                </section>

            )
        }else{
            return (
                <p> no data</p>
            )
        }



    }
}

Statistic.propTypes = {
    timeTaskArr: PropTypes.array.isRequired,
    app_options: PropTypes.object.isRequired,
    tasks: PropTypes.array.isRequired,
    statisticObj: PropTypes.object.isRequired,
    chartsArr:PropTypes.array.isRequired,
}

const mapStateToProps = (state)=>{

    return {
        statisticObj:state.statistics,
        tasks:state.tasks.items,
        timeTaskArr:state.statistics.timeTaskArr,
        app_options:state.appOptions,
        chartsArr: state.statistics.charts.tasksArr
    }



}

const mapDispatchToProps = (dispatch) => {


    return bindActionCreators({...actions, setTimeTask}, dispatch);
}

export default WithService()(connect(mapStateToProps,mapDispatchToProps)(Statistic));