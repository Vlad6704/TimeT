import moment from 'moment';


export default class getDataForLineChart{
    constructor(statisticObj,tasks,timeStat){
        this.charts = statisticObj.charts;
        this.arrTasksIdForCharts = statisticObj.charts.tasksArr;
        this.dateRange = statisticObj.dateRange;
        this.currMeasure = statisticObj.dateRange.currMeasure;
        this.startDate = statisticObj.dateRange.startDate;
        this.endDate = statisticObj.dateRange.endDate;
        this.isIntegerMeasure = statisticObj.dateRange.isIntegerMeasure;
        this.timeStat = timeStat;
        this.tasksArr = tasks;
    }
    getData(){
        const data = this.arrTasksIdForCharts.map(taskId => this.getLine(this.getTaskName(taskId),"hsl(178, 70%, 50%)",  this.getPointDataArr(taskId)));

        return data;
    }
    getTaskName(taskId){
        const task = this.tasksArr.find(task => task.id === taskId);
        return task.name;
    }
    getLine(name,color,dataArr){
        return {
            "id": name,
            "color": color,
            "data":dataArr,
        }
    }
    getPointDataArr(taskId){
        // [{x:"1",y:10},{x:"2",y:20},{x:"3",y:40}]
        let PointDataArr = [];
        const dateArr = this.getDateArr();
        if(this.currMeasure === 'day') {
            PointDataArr = dateArr.map(date => {return {"x":date, "y":this.getConvertedTime(this.timeStat.getSumTimeForTaskByDate(date,taskId))}});
        }
        if(this.currMeasure === 'week') {
            PointDataArr = dateArr.map(date => {return {"x":`${date.endDate}-${date.startDate}`, "y":this.getConvertedTime(this.timeStat.getSumTaskTimeByDateInterval(date.startDate, date.endDate, taskId))}});
        }
        if(this.currMeasure === 'month') {
            PointDataArr = dateArr.map(date => {return {"x":`${date.endDate}-${date.startDate}`, "y":this.getConvertedTime(this.timeStat.getSumTaskTimeByDateInterval(date.startDate, date.endDate, taskId))}});
        }


        return PointDataArr;
    }
    getConvertedTime(timeStrHHMM){
        //2:20 to 140
        const timeHm = moment(timeStrHHMM, "HH:mm");
        return (timeHm.hour()*60) + timeHm.minute();
    }
    getDateArr(){
        // [

        let newStartDate = this.startDate;
        let newEndDate = this.endDate;
        let arrDateRange = [];
        if(this.currMeasure === 'day') {
            newStartDate = moment(this.startDate, 'DD-MM-YYYY').add(2, 'days').format("DD.MM.YYYY");
            newEndDate = moment(this.startDate, 'DD-MM-YYYY').subtract(4, 'days').format("DD.MM.YYYY");
            const start = moment(newEndDate, 'DD-MM-YYYY');
            const end   = moment(newStartDate, 'DD-MM-YYYY');
            const range = moment.range(start, end);
            const acc = Array.from(range.by('days'));
            arrDateRange = acc.map(m => m.format("DD.MM.YYYY"));

        }
        if(this.currMeasure === 'week') {
            arrDateRange[0] = {
                startDate: moment(this.startDate, 'DD-MM-YYYY').subtract(3, 'week').format("DD.MM.YYYY"),
                endDate: moment(this.endDate, 'DD-MM-YYYY').subtract(3, 'week').format("DD.MM.YYYY")
            };
            arrDateRange[1] = {
                startDate: moment(this.startDate, 'DD-MM-YYYY').subtract(2, 'week').format("DD.MM.YYYY"),
                endDate: moment(this.endDate, 'DD-MM-YYYY').subtract(2, 'week').format("DD.MM.YYYY")
            };
            arrDateRange[2] = {
                startDate: moment(this.startDate, 'DD-MM-YYYY').subtract(1, 'week').format("DD.MM.YYYY"),
                endDate: moment(this.endDate, 'DD-MM-YYYY').subtract(1, 'week').format("DD.MM.YYYY")
            };
            arrDateRange[3] = {
                startDate: this.startDate,
                endDate: this.endDate,
            };
            arrDateRange[4] = {
                startDate: moment(this.startDate, 'DD-MM-YYYY').add(1, 'week').format("DD.MM.YYYY"),
                endDate: moment(this.endDate, 'DD-MM-YYYY').add(1, 'week').format("DD.MM.YYYY")
            };
        }
            if(this.currMeasure === 'month') {
                arrDateRange[0] = {
                    startDate: moment(this.startDate, 'DD-MM-YYYY').subtract(2, 'month').format("DD.MM.YYYY"),
                    endDate: moment(this.endDate, 'DD-MM-YYYY').subtract(2, 'month').format("DD.MM.YYYY")
                };
                arrDateRange[1] = {
                    startDate: moment(this.startDate, 'DD-MM-YYYY').subtract(1, 'month').format("DD.MM.YYYY"),
                    endDate: moment(this.endDate, 'DD-MM-YYYY').subtract(1, 'month').format("DD.MM.YYYY")
                };
                arrDateRange[2] = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                };
                arrDateRange[3] = {
                    startDate: moment(this.startDate, 'DD-MM-YYYY').add(1, 'month').format("DD.MM.YYYY"),
                    endDate: moment(this.endDate, 'DD-MM-YYYY').add(1, 'month').format("DD.MM.YYYY")
                };

            }

        return arrDateRange;
    }
}

