import axios from 'axios';

export  default class DataStoreService {
    doRequest(action,payload){
        const token = localStorage.token;
        return axios({
            method: 'POST',
            url: 'http://vlad6432.zzz.com.ua/time_t.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                "Authorization" : token
            },
            data:{
                action: action,
                payload,
            }

        });
    }
    getTasks(){
        return this.doRequest('getTasksArr');
    }
    getStore(){
        return this.doRequest('getStore');
    }
    getFileSystemItemsArr(){
        return this.doRequest('getFileSystemItemsArr');
    }
    getIdForNewTask(){
        return this.doRequest('getIdForNewTask');
    }
    createNewTask(ObjFormVal){
        return this.doRequest('createNewTask',ObjFormVal);
    }
    createNewFolder(Obj){
        return this.doRequest('createNewFolder',Obj);
    }
    startTask(taskId, stageId = -1){
        const payload = {taskId,stageId}
        return this.doRequest('startTask',payload);
    }
    stopTask(taskId){
        const payload = {taskId}
        return this.doRequest('stopTask',payload);
    }
    getTimeTask(){
        return this.doRequest('getTimeTask');
    }
    renameFolder(payload){
        return this.doRequest('renameFolder',payload);
    }
    removeFolder(folderId){
        return this.doRequest('removeFolder',{folderId});
    }
    replaceFolder(folderId,parentId){
        return this.doRequest('replaceFolder',{folderId,parentId});
    }
    renameTask(taskName,taskId){
        return this.doRequest('renameTask',{taskName,taskId});
    }
    removeTask(taskId){
        return this.doRequest('removeTask',{taskId});
    }
}