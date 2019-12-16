 const statistics_func = {};

statistics_func.getTimeDifference = (firstTime,secondTime) =>{

    let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);
    let different = (getDate(secondTime) - getDate(firstTime));
    let differentRes, hours, minuts;
    if(different > 0) {
        differentRes = different;
        hours = Math.floor((differentRes % 86400000) / 3600000);
        minuts = Math.round(((differentRes % 86400000) % 3600000) / 60000);
    } else {
        differentRes = Math.abs((getDate(firstTime) - getDate(secondTime)));
        hours = Math.floor(24 - (differentRes % 86400000) / 3600000);
        minuts = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
    }
    let result = hours + ':' + minuts;
    return result;
}
statistics_func.getTimeSum = (firstTime,secondTime) =>{
    // format 01:20

    const firstTime_hours = Number(firstTime.split(':')[0]);
    const firstTime_minute = Number(firstTime.split(':')[1]);
    const secondTime_hours = Number(secondTime.split(':')[0]);
    const secondTime_minute = Number(secondTime.split(':')[1]);
    let sum_minutes = firstTime_minute + secondTime_minute;
    let sum_hours = firstTime_hours + secondTime_hours;
    if(sum_minutes > 59 ) {
        sum_minutes -= 60;
        sum_hours += 1;
    }
    return  sum_hours + ':' + sum_minutes;


}



 export default statistics_func;