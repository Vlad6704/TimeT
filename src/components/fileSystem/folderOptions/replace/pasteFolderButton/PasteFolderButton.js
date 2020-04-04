import React from 'react';
import WithService from "../../../../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";

const PasteFolderButton = ({setFolderAvailable,setFileSystemItems,currentFolderId,replaceFolderId,service,setReplaceFolderId}) => {

    const PasteFolderHandler = ()=>{
        service.replaceFolder(replaceFolderId,currentFolderId).then((response)=>{
            console.log(response.data);
            setFileSystemItems(response.data);
            setFolderAvailable(replaceFolderId);
            setReplaceFolderId(-1);
        },(error)=>{

        });



    }

    return(
        <div className={'PasteFolderButton cursPointSelNon'} onClick={PasteFolderHandler}>
            Paste Folder
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        currentFolderId:state.fileSystem.currentItemId,
        replaceFolderId:state.fileSystem.replaceFolderId,
    }
};
export default WithService()(connect(mapStateToProps,actions)(PasteFolderButton));
