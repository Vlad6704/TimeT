import Moment from "moment";
import { extendMoment } from 'moment-range';

import statistics_func from '../../../functions/statistic/statistics_func';
const {isFirstTimeGreaterSecond,getTimeDifference,getTimeSum,getNextDayStr } = statistics_func;
const moment = extendMoment(Moment);


export default class TimeStat {

    
    constructor(timeTaskArr,timeShift){
        this.timeTaskArr = timeTaskArr;
        this.timeShift = timeShift;
    }
    getSumTaskTimeByDateIntervalAndTaskArr(startDate, endDate, arrTaskId, stageId){
        const arrSumForTasks = arrTaskId.map(taskId => this.getSumTaskTimeByDateInterval(startDate, endDate, taskId, stageId));
        const sum = this.getSumArrTime(arrSumForTasks);
        return sum;
    }
    getSumTaskTimeByDateInterval(startDate, endDate, taskId, stageId = -1){
        if(startDate && startDate !== endDate){
            const start = moment(startDate, 'DD-MM-YYYY');
            const end   = moment(endDate, 'DD-MM-YYYY');
            const range = moment.range(start, end);
            const acc = Array.from(range.by('days'));
            const arrDateRange = acc.map(m => m.format("DD.MM.YYYY"));
            const arrTimeTaskForDate = arrDateRange.map((date) => this.getSumTimeForTaskByDate(date,taskId,stageId));
            const sum = this.getSumArrTime(arrTimeTaskForDate);
            return sum;
        }else{
            return this.getSumTimeForTaskByDate(endDate,taskId,stageId);
        }

    }
    getArrTaskIdAndSumSortedForDate(date,curTime){
        //date = "30.12.2019";
        let arrTaskIdForMainDate;
        let arrTaskIdInTimeShift;
        let arrTaskId =[];
        if(isFirstTimeGreaterSecond(`0${this.timeShift}:00`, curTime)){
            arrTaskIdInTimeShift = this.getArrAllTaskIdForDate(date);
            //if current time lower time shift get prev day
            date = moment(date, "DD-MM-YYYY") .subtract(1, 'day').format("DD.MM.YYYY");

        }
        arrTaskIdForMainDate = this.getArrAllTaskIdForDate(date);
        if(!arrTaskIdForMainDate && !arrTaskIdInTimeShift) return false;
        if(arrTaskIdForMainDate)arrTaskId = [...arrTaskIdForMainDate];
        if(arrTaskIdInTimeShift)arrTaskId = [...arrTaskId, ...arrTaskIdInTimeShift];
        arrTaskId = [...new Set(arrTaskId)];
        let arrTaskIdAndSum = arrTaskId.map((taskId) => {
            return [taskId,this.getSumTimeForTaskByDate(date, taskId, -1 )];
        });
        return this.getSortArrIdAndSum(arrTaskIdAndSum);
    }

    getSortArrIdAndSum(arrIdAndSum){
        if(!arrIdAndSum ) return false;
        return arrIdAndSum.sort((a,b) => {
            let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);
            let different = (getDate(a[1]) - getDate(b[1]));
            if(different > 0) {
                return -1;
            } else {
                return 1;
            }
        });
    }

    getArrAllTaskIdForDate(date){
        const dayObj = this.getDayObjByDate(date);
        if(dayObj === undefined) return false;
        return dayObj.tasks.map((task) => task.id);
    }

    getSumTimeForTaskForToday(taskId, stageId = -1){
        // return sum time for task (by taskId and stageId) for current date
        const date = this._getCurrentDate();
        return this.getSumTimeForTaskByDate(date, taskId, stageId = -1);
    }

    getSumTimeForTaskByDate(date, taskId, stageId = -1){
        //work with timeShift
        let sum;
        if(this.timeShift > 0){
            const sumFirstDay = this.getSumTimeAfterTimeShiftForDay(date, taskId, stageId );
            const sumSecondDay = this.getSumTimeBeforeTimeShiftForDay(getNextDayStr(date), taskId, stageId );
            sum = getTimeSum(sumFirstDay , sumSecondDay);

        }else{
            sum = this.getSumTimeAfterTimeShiftForDay(date, taskId, stageId );

        }
        return sum;
    }

    getSumArrTime(arr){
        let sum = '00:00';
        arr.forEach((time) =>{
            sum = getTimeSum(sum , time);
        });
        return sum;
    }

    getSumTimeAfterTimeShiftForDay(date,taskId, stageId = -1){
        //if timeShift is 05:00, sum all time items between 05:00 and 23:59
        let sum = '00:00';
        let timeArr = this.getTimeArr(date,taskId, stageId );
        if(!timeArr) return sum;
        let arrTimeItemsOngoingInTimeShift = this.getArrTimeItemsThatOngoingInTime(timeArr, `0${this.timeShift}:00`);
        arrTimeItemsOngoingInTimeShift = this.getTimeArrWithSettedStartTimeForAllTimeItems(arrTimeItemsOngoingInTimeShift, `0${this.timeShift}:00`);
        const arrTimeItemsThatStartedAfterTimeShift = this.getArrTimeItemsThatStartedAfterTime(timeArr, `0${this.timeShift}:00`);
        timeArr = [...arrTimeItemsOngoingInTimeShift,...arrTimeItemsThatStartedAfterTimeShift];
        // console.log(timeArr);
        // console.log(arrTimeItemsOngoingInTimeShift,arrTimeItemsThatStartedAfterTimeShift);
        let differenceArr = timeArr.map((timeItemArr) => {
            return getTimeDifference(timeItemArr[0],timeItemArr[1]);
        });

        differenceArr.forEach((time) =>{
            sum = getTimeSum(sum , time);
        });
        return sum;
    }


    getSumTimeBeforeTimeShiftForDay(date,taskId, stageId = -1){
        //if timeShift is 05:00, sum all time items between 00:00 and 04:59
        let sum = '00:00';
        const timeShift = moment({ hour:this.timeShift}).subtract(1,'minute').format("HH:mm");
        let timeArr = this.getTimeArr(date,taskId, stageId );
        if(!timeArr) return sum;
        let arrTimeItemsOngoingInTimeShift = this.getArrTimeItemsThatOngoingInTime(timeArr, timeShift);
        arrTimeItemsOngoingInTimeShift = this.getTimeArrWithSettedStopTimeForAllTimeItems(arrTimeItemsOngoingInTimeShift, timeShift);
        const arrTimeItemsThatStoppedBeforeTime = this.getArrTimeItemsThatStoppedBeforeTime(timeArr, timeShift);

        timeArr = [...arrTimeItemsOngoingInTimeShift,...arrTimeItemsThatStoppedBeforeTime];
        let differenceArr = timeArr.map((timeItemArr) => {
            return getTimeDifference(timeItemArr[0],timeItemArr[1]);
        });

        differenceArr.forEach((time) =>{
            sum = getTimeSum(sum , time);
        });
        return sum;
    }

    getTimeArr(date,taskId, stageId = -1){
        const dayObj = this.getDayObjByDate(date);
        if(!dayObj) return false;
        const task = (this.getTaskObjById(taskId,dayObj));
        if(!task) return false;
        const stage = (this.getStageObjById(stageId,task));
        if(!stage) return false;
        return this.getTimeArrByStageId(stage);
    }

    getArrTimeItemsThatOngoingInTime(timeArr, time){
        timeArr = timeArr.filter((timeItemArr) =>{
            if(isFirstTimeGreaterSecond(timeItemArr[0],time) == false && isFirstTimeGreaterSecond(timeItemArr[1],time) == true){
                return timeItemArr;
            }

        });
        return timeArr;
    }

    getArrTimeItemsThatStartedAfterTime(timeArr, time){
        timeArr = timeArr.filter((timeItemArr) =>{
            if(isFirstTimeGreaterSecond(timeItemArr[0],time)  ){
                return timeItemArr;
            }

        });
        return timeArr;
    }

    getArrTimeItemsThatStoppedBeforeTime(timeArr, Stoppedtime){
        timeArr = timeArr.filter((timeItemArr) =>{
            if(isFirstTimeGreaterSecond(Stoppedtime,timeItemArr[1] )){
                return timeItemArr;
            }

        });
        return timeArr;
    }

    getTimeArrWithSettedStartTimeForAllTimeItems(timeArr, startTime){
        return timeArr.map((timeItem) =>{
            return [startTime,timeItem[1]]
        });
    }
    getTimeArrWithSettedStopTimeForAllTimeItems(timeArr, stoptTime){
        return timeArr.map((timeItem) =>{
            return [timeItem[0],stoptTime]
        });
    }

    getDayObjByDate(date){
        // console.log(timeTaskArr);
        if(this.timeTaskArr){
            return this.timeTaskArr.find((dayObj)=>{
                return  dayObj.date === date;
            });
        }
    }
    getTaskObjById(id,dayObj){
        if(dayObj){
            return dayObj.tasks.find((task)=>{
                return  task.id === id;
            });
        }
    }
    getStageObjById(id,task){
        if(task){
            return task.stages.find((stage)=>{
                return  stage.id === id;
            });
        }
    }
    getTimeArrByStageId(stage){
        if(stage){
            return stage.time;
        }
    }

    _getCurrentDate() {
        const date = moment().subtract(this.timeShift,'hours').format("DD.MM.YYYY");
        return  date;
    }

    _getCurrentTime() {
        return moment().format("HH:mm");
    }
}