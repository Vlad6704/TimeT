import DataStoreService from "../services/service";
import * as action_type from './action_type';
import {setFileSystemItems, setTasks} from './fileSystem/fileSystemActions'
import {setOngoingTasks, setSwitchableOngoingTask, setTimeTask} from "./ongoingTasks/ongoingTasksActions";

const service = new DataStoreService();




export const fetchStore = () => {
    return (dispatch) => {
        service.getStore().then((response) =>{
            // console.log(response.data);
            const data = response.data;
            let tasks;
            let fileSystemItems;
            let ongoingTasksArr;
            if(data.tasks) tasks = JSON.parse(data.tasks);
            else  tasks = [];
            if(data.fileSystem) fileSystemItems = JSON.parse(data.fileSystem);
            else fileSystemItems = [];
            if(data.activeTask) ongoingTasksArr = data.activeTask;
            else ongoingTasksArr = [];
            dispatch(setTasks(tasks));
            dispatch(setFileSystemItems(fileSystemItems));
            dispatch(setOngoingTasks(ongoingTasksArr));

            if(data.activeTask[0]) dispatch(setSwitchableOngoingTask(data.activeTask[0].id));
        }, (error) =>{
            console.log(error)
        });
        service.getTimeTask().then((response) => {

            dispatch(setTimeTask(response.data));

        },(error)=>{

        })
    }
}

