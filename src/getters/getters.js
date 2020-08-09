export const getIdAllTasksInsideFolder = (folderId,arrfileSystemItems, tasks) =>{
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