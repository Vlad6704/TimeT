import React, { useState } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/statistics/statisticsActions';
import TimeStat from '../timeStatistic_class/timeStat';
import Tasks from "./tasks/tasks";
import {getIdAllTasksInsideFolder} from '../../../getters/getters'
import './statFileSystem.css';

const StatFileSystem = ({startDate,endDate,tasks,fileSystemObj,timeTaskArr,app_options,statChartsTasksArr,pushOrRemIdForStatChartTaskArr, folderClickHandler, arrStatOpenFolderIds}) => {
    // const [arrStatOpenFolderIds, setArrStatOpenFolderIds] = useState([]);
    const timeStat = new TimeStat(timeTaskArr,app_options.timeShift);




    const getFileSystemTree = (arrfileSystemItems,parentId) => {

        return arrfileSystemItems.map(fileSystemItem => {

            if(fileSystemItem.parentsId === parentId){
                // console.log(getIdAllTasksInsideFolder(fileSystemItem.id,fileSystemObj.items, tasks));
                return (
                    <div className={`stat-folder level_id_${parentId+1} ${arrStatOpenFolderIds.some((id) => id === fileSystemItem.id)?'open':null}`}
                         onClick={(ev)=>folderClickHandler(ev,fileSystemItem.id)}
                    >
                        <i className={"icon-folder-solid stat-folder__icon"}></i>
                        <span className={'stat-folder-title'}>
                            {fileSystemItem.name}
                        </span>
                        <span className={'stat-folder__sum-time'}>
                            {timeStat.getSumTaskTimeByDateIntervalAndTaskArr(startDate,endDate,getIdAllTasksInsideFolder(fileSystemItem.id,fileSystemObj.items, tasks), -1)}
                        </span>
                        <div className={"stat-folder__inner"}>
                            {getFileSystemTree(arrfileSystemItems,fileSystemItem.id)}
                            <Tasks
                                tasks={tasks}
                                folderId = {fileSystemItem.id}
                                statChartsTasksArr = {statChartsTasksArr}
                                timeStat = {timeStat}
                                onClickChartsHandler = {pushOrRemIdForStatChartTaskArr}
                                startDate = {startDate}
                                endDate = {endDate}
                            />
                        </div>
                    </div>
                )
            }
        })
    }
    return (
        <div className={"stat-file-system"}>
            {getFileSystemTree(fileSystemObj.items,-1)}
            <Tasks
                tasks={tasks}
                folderId = {-1}
                statChartsTasksArr = {statChartsTasksArr}
                timeStat = {timeStat}
                onClickChartsHandler = {pushOrRemIdForStatChartTaskArr}
                startDate = {startDate}
                endDate = {endDate}
            />
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
        arrStatOpenFolderIds:state.statistics.arrStatOpenFolderIds,

    }
}

export default connect(mapStateToProps,actions)(StatFileSystem);