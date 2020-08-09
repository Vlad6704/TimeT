import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";
import WithService from "../../../../hoc/with-service/with-service";



const RemoveFolderButton = ({removeFolderHandler})=>{



    return (
        <i className={"icon-trash-alt-solid folder-options__remove-folder"} onClick={removeFolderHandler}></i>
    )
}

const mapStateToProps = (state)=>{
    return {

    }
};

export default WithService()(connect(mapStateToProps,actions)(RemoveFolderButton));