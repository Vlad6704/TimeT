import DataStoreService from "../services/service";
import * as action_type from './action_type';
import {setFileSystemItems, setTasks} from './fileSystem/fileSystemActions'
import {
    setOngoingTasksHandler,
    setSwitchableOngoingTask,
    setTimeTask
} from "./ongoingTasks/ongoingTasksActions";
import {setLogIn, setRedirectToLogIn} from './auth/authActions';


const service = new DataStoreService();




export const fetchStore = () => {
    return (dispatch) => {
        service.getStore().then((response) =>{
            // console.log(response.data);
            const data = response.data;
            console.log(data);
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
            dispatch(setOngoingTasksHandler(ongoingTasksArr));
            dispatch(setLogIn());

            if(data.activeTask && data.activeTask[0]) dispatch(setSwitchableOngoingTask(data.activeTask[0].id));
        })
        .catch( (error) =>{
            console.log(error);
            if(error.response.status === 401){
                dispatch(setRedirectToLogIn());
            }
        });
        service.getTimeTask().then((response) => {

            dispatch(setTimeTask(response.data));

        },(error)=>{

        })
    }
}

