import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/actions";

const getInputVal = () =>{
    return document.getElementById("nameNewFolder").value;
}

const CreateFolderForm = ({CreateNewFolder}) =>{
    return (
        <div

        >
            <input id={'nameNewFolder'}/>
            <button onClick={()=> CreateNewFolder(getInputVal())}>Submit</button>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps,actions)(CreateFolderForm);