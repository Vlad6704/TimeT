import React from 'react';
import WithService from "../../../../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";

const getInputVal = () =>{
    return document.getElementById("taskName").value;
}

const RenameTaskForm = ({renameTaskHandler})=>{


    return (
        <div>
            <input id={'taskName'}/>
            <button onClick={()=> renameTaskHandler(getInputVal())}>Submit</button>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default WithService()(connect(mapStateToProps,actions)(RenameTaskForm));