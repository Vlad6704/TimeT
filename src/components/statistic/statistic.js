import React,{Component} from 'react';
import WithService from "../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../redux_components/actions";
import moment from 'moment';
import TimeStat from './timeStatistic_class/timeStat';
import StatFileSystem from './statFileSystem/statFileSystem';
import DateRangePanel from './dateRangePanel/dateRangePanel';
import LineChart from './charts/lineChart/lineChart';
import getDataForLineChart from './charts/lineChart/getDataForLineChart';

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

        const tasksItems = () =>
        {

            if( Array.isArray(timeTaskArr) &&  Array.isArray(tasks) && tasks.length > 0){

                // const date = "07.01.2020";
                // const curTime = "08:00";
                let date = moment().format("DD.MM.YYYY");
                const curTime =  moment().format("HH:mm");
                const arrTaskIdAndSumSorted = this.timeStat.getArrTaskIdAndSumSortedForDate(date,curTime);
                if(!arrTaskIdAndSumSorted ) return false;
                return arrTaskIdAndSumSorted.map((item, idx) => {
                    const task = this.getTaskById(item[0],tasks);
                    // console.log(tasks);
                    return(
                        <div
                            key={idx}
                            className={'statistic_item'}
                            style={{

                                 border:'1px solid rgba(0,255,101,0.55)',
                             }}
                        >
                            name:  {task.name} {item[1]}

                        </div>


                    )
                })
            }
        }
        if( Array.isArray(timeTaskArr) &&  Array.isArray(tasks) && tasks.length > 0){
            return (
                <div className={'statistic'}>
                    {tasksItems()}
                    <div className={'chart'} style={{width:'700px', height:'350px'}}>
                        <LineChart data={new getDataForLineChart(statisticObj,tasks,new TimeStat(timeTaskArr,app_options.timeShift )).getData()} />
                    </div>
                    <DateRangePanel />
                    <StatFileSystem />
                </div>
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