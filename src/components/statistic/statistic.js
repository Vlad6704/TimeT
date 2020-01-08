import React,{Component} from 'react';
import WithService from "../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../redux_components/actions";
import statistics_func from '../../functions/statistic/statistics_func';
import moment from 'moment';
import TimeStat from './timeStatistic_class/timeStat';

const {isFirstTimeGreaterSecond,getTimeDifference,getTimeSum,getNextDayStr } = statistics_func;


class Statistic extends Component{

    componentDidMount() {
        const {service,setTimeTask, timeTaskArr,app_options} = this.props;
        service.getTimeTask().then((response) => {
            console.log(response.data);
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
        const { timeTaskArr, app_options, tasks} = this.props;

        const tasksItems = () =>
        {

            if( Array.isArray(timeTaskArr) &&  Array.isArray(tasks) && tasks.length > 0){
                const timeStat = new TimeStat(timeTaskArr,app_options.timeShift );
                // const day = "30.12.2019";
                let day = moment().format("DD.MM.YYYY");
                if(isFirstTimeGreaterSecond(`0${app_options.timeShift}:00`, moment().format("HH:mm"))){
                    //if current time lower time shift
                    day = moment() .subtract(1, 'day').format("DD.MM.YYYY");
                }
                const arrTaskIdAndSumSorted = timeStat.getArrTaskIdAndSumSortedForDate(day);
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

        return (
                <div className={'statistic'}>
                    {tasksItems()}

                </div>
            )


    }
}

const mapStateToProps = (state)=>{

    return {
        tasks:state.tasks,
        timeTaskArr:state.timeTaskArr,
        app_options:state.app_options,

    }



}

export default WithService()(connect(mapStateToProps,actions)(Statistic));