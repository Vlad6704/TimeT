import moment from "moment";
import statistics_func from '../../../functions/statistic/statistics_func';
const {isFirstTimeGreaterSecond,getTimeDifference,getTimeSum,getNextDayStr } = statistics_func;

export default class TimeStat {

    
    constructor(timeTaskArr,timeShift){
        this.timeTaskArr = timeTaskArr;
        this.timeShift = timeShift;
    }

    getArrTaskIdAndSumSortedForDate(date){
        //date = "30.12.2019";

        const arrTaskId = this.getArrAllTaskIdForDate(date);
        if(!arrTaskId) return false;
        let arrTaskIdAndSum = arrTaskId.map((taskId) => {
            return [taskId,this.getTaskSumTimeForDay(date, taskId, -1 )];
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

    getTaskSumTimeForDay(date,taskId, stageId = -1){
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
        const dayObj = this.getDayObjByDate(date);
        if(!dayObj) return sum;
        const task = (this.getTaskObjById(taskId,dayObj));
        if(!task) return sum;
        const stage = (this.getStageObjById(stageId,task));
        if(!stage) return sum;
        let timeArr = this.getTimeArr(stage);
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
        const dayObj = this.getDayObjByDate(date);
        if(!dayObj) return sum;
        const task = (this.getTaskObjById(taskId,dayObj));
        if(!task) return sum;
        const stage = (this.getStageObjById(stageId,task));
        if(!stage) return sum;
        let timeArr = this.getTimeArr(stage);
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
    getTimeArr(stage){
        if(stage){
            return stage.time;
        }
    }



}