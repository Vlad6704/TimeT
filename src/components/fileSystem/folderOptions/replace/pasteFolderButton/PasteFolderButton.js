import React from 'react';
import WithService from "../../../../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";

const PasteFolderButton = ({PasteFolderHandler}) => {


    return(
        <i className={"icon-paper folder-options__cut-folder"} onClick={PasteFolderHandler}>

        </i>
    )
}

const mapStateToProps = (state)=>{
    return {

    }
};
export default WithService()(connect(mapStateToProps,actions)(PasteFolderButton));
