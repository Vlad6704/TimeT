import React from 'react';
import WithService from "../../../../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";

const CutFolderButton = ({CutFolderHandler}) => {


    return(
        <i className={"icon-cut folder-options__cut-folder"} onClick={CutFolderHandler}></i>
    )
}

const mapStateToProps = (state)=>{
    return {

    }
};
export default WithService()(connect(mapStateToProps,actions)(CutFolderButton));
