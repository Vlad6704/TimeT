import React, { useState } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../redux_components/actions';
import moment from 'moment';
import TimeStat from '../../timeStatistic_class/timeStat';

const StatFolders = ({startDate,endDate,tasks,fileSistemObj,timeTaskArr,app_options,statChartsTasksArr,pushOrRemIdForStatChartTaskArr}) => {
    const [arrStatOpenFolderIds, setArrStatOpenFolderIds] = useState([]);
    const timeStat = new TimeStat(timeTaskArr,app_options.timeShift);
    const folderClickHandler = (e,folderId) =>{
        e.stopPropagation();
        let newarrStatOpenFolderIds;
        const idxFolderId = arrStatOpenFolderIds.indexOf(folderId);

        if(idxFolderId === -1) newarrStatOpenFolderIds = [...arrStatOpenFolderIds,folderId ];
        else {
            newarrStatOpenFolderIds = [...arrStatOpenFolderIds.slice(0,idxFolderId),...arrStatOpenFolderIds.slice(idxFolderId+1)];
        }
        setArrStatOpenFolderIds(newarrStatOpenFolderIds);
    }
    const getIdAllTasksInsideFolder = (folderId,arrFileSistemItems, tasks) =>{
        //including descendants
        let fileSistemReduce;
        let tasksReduce;
        fileSistemReduce = arrFileSistemItems.reduce( (resArr=[],item) => {
            if(folderId === item.parentsId){
                resArr.push(...getIdAllTasksInsideFolder(item.id,arrFileSistemItems, tasks));
            }
            return resArr;

            },[]);
        tasksReduce = tasks.reduce( (taskArr=[],item) => {
            if(folderId === item.folderId){
                taskArr.push(item.id);
            }
            return taskArr;
        },[]);
         return fileSistemReduce.concat(tasksReduce);


    }
    const getTasksArrDyFolderId = (tasks,folderId) => {
        return tasks.map(item => {
            if(folderId === item.folderId){

                return (
                    <div className={"statTask"}>
                        <span className={`cursPointSelNon addCharts ${statChartsTasksArr.some(id => id === item.id)?'active':''}`} onClick={()=>pushOrRemIdForStatChartTaskArr(item.id)}>
                            Charts
                        </span>
                        TaskTitle: {item.name}
                        <span className={'sumTime'}>
                            {timeStat.getSumTaskTimeByDateInterval(startDate,endDate,item.id, -1)}
                        </span>
                    </div>
                )
            }
        })
    }
    const getFileSystemTree = (arrFileSistemItems,parentId) => {

        return arrFileSistemItems.map(fileSistemItem => {

            if(fileSistemItem.parentsId === parentId){
                // console.log(getIdAllTasksInsideFolder(fileSistemItem.id,fileSistemObj.items, tasks));
                return (
                    <div className={`statFolder level_id_${parentId+1} ${arrStatOpenFolderIds.some((id) => id === fileSistemItem.id)?'open':null}`}
                         onClick={(ev)=>folderClickHandler(ev,fileSistemItem.id)}
                    >
                        <p className={'statFolderTitle'}>{fileSistemItem.name}
                            <span className={'sumTime'}>

                                {timeStat.getSumTaskTimeByDateIntervalAndTaskArr(startDate,endDate,getIdAllTasksInsideFolder(fileSistemItem.id,fileSistemObj.items, tasks), -1)}
                            </span>
                        </p>
                        <div className={"inner"}>
                            {getFileSystemTree(arrFileSistemItems,fileSistemItem.id)}
                            {getTasksArrDyFolderId(tasks,fileSistemItem.id)}
                        </div>
                    </div>
                )
            }
        })
    }

    return (
        <div>
            {getFileSystemTree(fileSistemObj.items,-1)}
            {getTasksArrDyFolderId(tasks,-1)}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        statChartsTasksArr:state.statistic.charts.tasksArr,
        tasks: state.tasks,
        fileSistemObj: state.fileSistem,
        dateRange: state.statistic.dateRange,
        timeTaskArr:state.timeTaskArr,
        app_options:state.app_options,
        startDate:state.statistic.dateRange.startDate,
        endDate:state.statistic.dateRange.endDate,
    }
}

export default connect(mapStateToProps,actions)(StatFolders);