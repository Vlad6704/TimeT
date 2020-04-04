import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";
import WithService from "../../../../hoc/with-service/with-service";



const RemoveFolderButton = ({service,currentFolderId,setFileSystemItems,onGoToHome})=>{

    const removeFolderHandler = ()=>{
        if(!window.confirm("Remove ?"))return false;
        service.removeFolder(currentFolderId).then((response)=>{
            // console.log(response.data);
            setFileSystemItems(response.data);
            onGoToHome();
        },(error)=>{

        });
    }

    return (
        <div className={"cursPointSelNon"} onClick={removeFolderHandler}>
            Remove folder
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        currentFolderId:state.fileSystem.currentItemId,
    }
};

export default WithService()(connect(mapStateToProps,actions)(RemoveFolderButton));