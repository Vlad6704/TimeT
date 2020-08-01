import React from 'react'

const Tasks = ({tasks,folderId, statChartsTasksArr, timeStat, onClickChartsHandler, startDate, endDate}) => {

    const buildChartHandler = (ev, id) => {
        ev.stopPropagation();
        onClickChartsHandler(id);
    }

    return tasks.map(item => {
        if(folderId === item.folderId){

            return (
                <div key={item.id} className={"stat-task"}>
                    <i className={"icon-tasks-solid stat-task__task-icon"}></i>
                    <span className={'stat-task__title'}>
                        {item.name}
                    </span>
                    <span className={'stat-task__sum-time'}>
                        {timeStat.getSumTaskTimeByDateInterval(startDate,endDate,item.id, -1)}
                    </span>
                    <span className={`button stat-task__add-charts ${statChartsTasksArr.some(id => id === item.id)?'button stat-task__add-charts_active':''}`} onClick={(ev)=>buildChartHandler(ev, item.id)}>
                        <i className={"icon-graph stat-task__graph-icon"}></i>
                    </span>
                </div>
            )
        }
    })
}

export default Tasks;