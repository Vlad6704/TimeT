import React from 'react';
import WithService from "../../../../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";

const PasteFolderButton = ({PasteFolderHandler}) => {


    return(
        <div className={'PasteFolderButton cursPointSelNon'} onClick={PasteFolderHandler}>
            Paste Folder
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {

    }
};
export default WithService()(connect(mapStateToProps,actions)(PasteFolderButton));
