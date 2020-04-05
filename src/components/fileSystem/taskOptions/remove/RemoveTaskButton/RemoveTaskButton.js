import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";
import WithService from "../../../../hoc/with-service/with-service";



const RemoveTaskButton = ({removeTaskHandler})=>{

    return (
        <div className={"cursPointSelNon"} onClick={removeTaskHandler}>
            Remove Task
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {

    }
};

export default WithService()(connect(mapStateToProps,actions)(RemoveTaskButton));