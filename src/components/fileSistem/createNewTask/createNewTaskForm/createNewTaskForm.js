import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/actions";
import WithService from "../../../hoc/with-service/with-service";

const getInputVal = () =>{
    return document.getElementById("nameNewFolder").value;
}


    const addNewStage = () =>{
        const list = document.getElementById('stage_list');
        const buttonAddNewStage = document.getElementById('buttonAddNewStage');
        const InputNewStageTitle = document.getElementById('InputNewStageTitle');
        const NewStageTitle = InputNewStageTitle.value;
        if(!NewStageTitle) return false;
        let li = document.createElement('LI');
        li.innerHTML = NewStageTitle;
        list.appendChild(li);
        InputNewStageTitle.value = '';
    }

    const getObjFormVal = ()=>{
        const list = document.getElementById('stage_list');
        const objFormVal = {};
        const items = list.getElementsByTagName('li');
        let stageItems = [];
        let stageItemIdx = -1;
        objFormVal.name = document.getElementById('titleNewTask').value;
        objFormVal.description = document.getElementById('descriptionNewTask').value;

        //list to array
        for (var j = 0; j < items.length; j++) {
            let str = items[j].innerHTML;
            stageItemIdx++;
            if (stageItems.indexOf(str) == -1) {
                stageItems.push(
                    {
                        id:stageItemIdx,
                        name:str
                    }
                    );
            }
        }
        objFormVal.stages = stageItems;
        objFormVal.stageItemIdx = stageItemIdx;

        return objFormVal;
}




const CreateNewTaskForm = ({CreateNewTask,service,temporaryId,increaseTemporaryIdForTask, folderId,changeStatusAndSetIdForTaskByTemporaryId}) =>{
    const GetNewIdAndCreateNewTask = ()=>{
        const ObjFormVal = getObjFormVal();
        ObjFormVal.folderId = folderId;
        CreateNewTask({
            getObjFormVal: ObjFormVal,
            temporaryId
        });
        increaseTemporaryIdForTask();
        service.createNewTask(ObjFormVal).
            then((response) =>{
               console.log(response.data);
                if(response.data.status === "success") changeStatusAndSetIdForTaskByTemporaryId({temporaryId:temporaryId, status: 'created', id:response.data.idNewTask});

            },
            (error) =>{       console.log(error)    });

    };

    return (
        <div

        >
            <input id={'titleNewTask'} placeholder={'Title'}/>
            <textarea id={'descriptionNewTask'} placeholder={'Description'}/>
            <div id={'stageList'}>
                Add stages
                <ul id='stage_list'>

                </ul>

                <input id="InputNewStageTitle" />
                <button id="buttonAddNewStage" onClick={addNewStage}> Add </button>
            </div>
            <button onClick={()=> GetNewIdAndCreateNewTask()}>
                Submit
            </button>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        temporaryId: state.other_inf.newTemporaryIdForNewTask,
        folderId: state.fileSistem.currentItemId,
    }
}

export default WithService()(connect(mapStateToProps,actions)(CreateNewTaskForm));