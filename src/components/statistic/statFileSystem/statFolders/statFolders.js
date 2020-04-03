import React, { useState } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../redux_components/actions';
import TimeStat from '../../timeStatistic_class/timeStat';

const StatFolders = ({startDate,endDate,tasks,fileSystemObj,timeTaskArr,app_options,statChartsTasksArr,pushOrRemIdForStatChartTaskArr}) => {
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
    const getIdAllTasksInsideFolder = (folderId,arrfileSystemItems, tasks) =>{
        //including descendants
        let fileSystemReduce;
        let tasksReduce;
        fileSystemReduce = arrfileSystemItems.reduce( (resArr=[],item) => {
            if(folderId === item.parentsId){
                resArr.push(...getIdAllTasksInsideFolder(item.id,arrfileSystemItems, tasks));
            }
            return resArr;

            },[]);
        tasksReduce = tasks.reduce( (taskArr=[],item) => {
            if(folderId === item.folderId){
                taskArr.push(item.id);
            }
            return taskArr;
        },[]);
         return fileSystemReduce.concat(tasksReduce);


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
    const getFileSystemTree = (arrfileSystemItems,parentId) => {

        return arrfileSystemItems.map(fileSystemItem => {

            if(fileSystemItem.parentsId === parentId){
                // console.log(getIdAllTasksInsideFolder(fileSystemItem.id,fileSystemObj.items, tasks));
                return (
                    <div className={`statFolder level_id_${parentId+1} ${arrStatOpenFolderIds.some((id) => id === fileSystemItem.id)?'open':null}`}
                         onClick={(ev)=>folderClickHandler(ev,fileSystemItem.id)}
                    >
                        <p className={'statFolderTitle'}>{fileSystemItem.name}
                            <span className={'sumTime'}>

                                {timeStat.getSumTaskTimeByDateIntervalAndTaskArr(startDate,endDate,getIdAllTasksInsideFolder(fileSystemItem.id,fileSystemObj.items, tasks), -1)}
                            </span>
                        </p>
                        <div className={"inner"}>
                            {getFileSystemTree(arrfileSystemItems,fileSystemItem.id)}
                            {getTasksArrDyFolderId(tasks,fileSystemItem.id)}
                        </div>
                    </div>
                )
            }
        })
    }

    return (
        <div>
            {getFileSystemTree(fileSystemObj.items,-1)}
            {getTasksArrDyFolderId(tasks,-1)}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        statChartsTasksArr:state.statistics.charts.tasksArr,
        tasks: state.tasks.items,
        fileSystemObj: state.fileSystem,
        dateRange: state.statistics.dateRange,
        timeTaskArr:state.statistics.timeTaskArr,
        app_options:state.appOptions,
        startDate:state.statistics.dateRange.startDate,
        endDate:state.statistics.dateRange.endDate,
    }
}

export default connect(mapStateToProps,actions)(StatFolders);