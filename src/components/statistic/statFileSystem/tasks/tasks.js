import React from 'react'

const Tasks = ({tasks,folderId, statChartsTasksArr, timeStat, onClickChartsHandler, startDate, endDate}) => {
    return tasks.map(item => {
        if(folderId === item.folderId){

            return (
                <div className={"statTask"}>
                    <span className={`cursPointSelNon addCharts ${statChartsTasksArr.some(id => id === item.id)?'active':''}`} onClick={()=>onClickChartsHandler(item.id)}>
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

export default Tasks;