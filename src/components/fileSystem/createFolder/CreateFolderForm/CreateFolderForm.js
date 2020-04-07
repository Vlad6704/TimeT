import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/fileSystem/fileSystemActions";
import WithService from "../../../hoc/with-service/with-service";

const getInputVal = () =>{
    return document.getElementById("nameNewFolder").value;
}



const CreateFolderForm = ({createNewFolderHandler}) =>{

    return (
        <div>
            <input id={'nameNewFolder'}/>
            <button onClick={()=> createNewFolderHandler(getInputVal())}>Submit</button>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default WithService()(connect(mapStateToProps,actions)(CreateFolderForm));