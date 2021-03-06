import React from 'react'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/fileSystem/fileSystemActions";
import WithService from "../../../hoc/with-service/with-service";
import ModalWindow from '../../../modalWindow/modalWindow';
import ModInput from "../../../modalWindow/modalElements/modInput";
import ModTextArea from "../../../modalWindow/modalElements/modTextArea";
import ModSubmit from "../../../modalWindow/modalElements/modSubmit";
import ModTitle from "../../../modalWindow/modalElements/modTitle";




const CreateNewTaskForm = ({GetNewIdAndCreateNewTask}) =>{
const inputRef = React.useRef(null);
const textareaRef = React.useRef(null);

React.useEffect(()=>{
    inputRef.current.focus();
},[]);


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
        const objFormVal = {};
        objFormVal.name = inputRef.current.value;

        //description
        // objFormVal.description = textareaRef.current.value;
        objFormVal.description = '';

        // stage
        let stageItems = [];
        let stageItemIdx = -1;
        // const list = document.getElementById('stage_list');
        // const items = list.getElementsByTagName('li');
        //list to array
        // for (var j = 0; j < items.length; j++) {
        //     let str = items[j].innerHTML;
        //     stageItemIdx++;
        //     if (stageItems.indexOf(str) == -1) {
        //         stageItems.push(
        //             {
        //                 id:stageItemIdx,
        //                 name:str
        //             }
        //             );
        //     }
        // }
        objFormVal.stages = stageItems;
        objFormVal.stageItemIdx = stageItemIdx;

        return objFormVal;
}



    return (
        <ModalWindow>
            <ModTitle title={"Add new task"} />
            <ModInput placeholder={'Title'}  inputRef={inputRef}/>

            {/*<ModTextArea placeholder={'Description'} textareaRef={textareaRef}/>*/}

            {/*<div id={'stageList'}>*/}
            {/*    Add stages*/}
            {/*    <ul id='stage_list'>*/}

            {/*    </ul>*/}

            {/*<input id="InputNewStageTitle" />*/}
            {/*<button id="buttonAddNewStage" onClick={addNewStage}> Add </button>*/}
            {/*</div>*/}

            <ModSubmit title={"Submit"} clickHandler={()=> GetNewIdAndCreateNewTask(getObjFormVal())} />

        </ModalWindow>

    )

}

CreateNewTaskForm.propTypes = {
    GetNewIdAndCreateNewTask: PropTypes.func
}

export default WithService()(connect(null,actions)(CreateNewTaskForm));