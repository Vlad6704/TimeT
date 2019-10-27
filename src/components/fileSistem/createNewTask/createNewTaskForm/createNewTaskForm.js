import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/actions";

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
        objFormVal.titleNewTask = document.getElementById('titleNewTask').value;
        objFormVal.descriptionNewTask = document.getElementById('descriptionNewTask').value;
        for (var j = 0; j < items.length; j++) {
            let str = items[j].innerHTML;
            if (stageItems.indexOf(str) == -1) {
                stageItems.push({name:str});
            }
        }
        objFormVal.stageItems = stageItems;
        return objFormVal;
}


const CreateNewTaskForm = ({CreateNewTask}) =>{
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
            <button onClick={()=> CreateNewTask(getObjFormVal())}>Submit</button>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps,actions)(CreateNewTaskForm);