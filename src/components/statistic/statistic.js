import React,{Component} from 'react';
import WithService from "../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../redux_components/actions";
import statistics_func from '../../functions/statistic/statistics_func';

class Statistic extends Component{

    componentDidMount() {
        const {service,setTimeTask, timeTaskArr} = this.props;
        service.getTimeTask().then((response) => {
            console.log(response.data);
            setTimeTask(response.data);


            const result = this.getSumTimeForDay('05.12.2019', 93, 0, response.data );
            console.log(result);
        },(error)=>{

        })
    }

    getSumTimeForDay(date,taskId, stageId = -1, timeTaskArr){
        const dayObj = this.getDayObjByDate(date,timeTaskArr);
        const task = (this.getTaskObjById(taskId,dayObj));
        const stage = (this.getStageObjById(stageId,task));
        const timeArr = this.getTimeArr(stage);
        let differenceArr = timeArr.map((timeItem) => {
            return statistics_func.getTimeDifference(timeItem[0],timeItem[1]);
        });
        let sum = '00:00';

        differenceArr.forEach((time) =>{
            sum = statistics_func.getTimeSum(sum , time);
        });
        return sum;
    }

    getDayObjByDate(date,timeTaskArr){
        return timeTaskArr.find((dayObj)=>{
           return  dayObj.date === date;
        });
    }
    getTaskObjById(id,dayObj){
        return dayObj.tasks.find((task)=>{
           return  task.id === id;
        });
    }
    getStageObjById(id,task){
        return task.stages.find((stage)=>{
           return  stage.id === id;
        });
    }
    getTimeArr(stage){
        return stage.time;
    }

    render(){
        const { timeTaskArr} = this.props;



        return(

                <h1>egeg</h1>
            )



    }
}

const mapStateToProps = (state)=>{

    return {
        timeTaskArr:state.timeTaskArr
    }



}

export default WithService()(connect(mapStateToProps,actions)(Statistic));