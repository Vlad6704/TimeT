import React,{Component} from 'react';
import WithService from "../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../redux_components/statistics/statisticsActions";
import moment from 'moment';
import TimeStat from './timeStatistic_class/timeStat';
import StatFileSystem from './statFileSystem/statFileSystem';
import DateRangePanel from './dateRangePanel/dateRangePanel';
import LineChart from './charts/lineChart/lineChart';
import getDataForLineChart from './charts/lineChart/getDataForLineChart';
import OngoingTasks from "../ongoingTasks/ongoingTasks";
import Header from "../header/header";

class Statistic extends Component{
    constructor( props) {
        super(props);
        this.timeStat = new TimeStat(props.timeTaskArr,props.app_options.timeShift );
    }
    componentDidMount() {


    }
    getTaskById(id, tasks){
        return tasks.find((item) =>{
            return item.id == id
        })
    }


    render(){
        const { timeTaskArr, app_options, tasks,statisticObj} = this.props;


        if( Array.isArray(timeTaskArr) &&  Array.isArray(tasks) && tasks.length > 0){
            return (
                <section className={'statistic'}>
                    <OngoingTasks/>
                    <Header />
                    <div >
                        {/*{tasksItems()}*/}
                        <div className={'chart'} style={{width:'700px', height:'350px'}}>
                            <LineChart data={new getDataForLineChart(statisticObj,tasks,new TimeStat(timeTaskArr,app_options.timeShift )).getData()} />
                        </div>
                        <DateRangePanel />
                        <StatFileSystem />
                    </div>
                </section>

            )
        }else{
            return (
                <p> no data</p>
            )
        }



    }
}

const mapStateToProps = (state)=>{

    return {
        statisticObj:state.statistics,
        tasks:state.tasks.items,
        timeTaskArr:state.statistics.timeTaskArr,
        app_options:state.appOptions,

    }



}

export default WithService()(connect(mapStateToProps,actions)(Statistic));