import React from 'react';
import WithService from "../../../../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";

const getInputVal = () =>{
    return document.getElementById("folderName").value;
}

const RenameFolderForm = ({service,currentFolderId,setFileSystemItems})=>{

    const renameFolderHandler = (folderName)=>{

        service.renameFolder({folderName:folderName,folderId:currentFolderId}).then((response)=>{
            // console.log(response.data);
            setFileSystemItems(response.data);
        },(error)=>{

        });
    }
    return (
        <div>
            <input id={'folderName'}/>
            <button onClick={()=> renameFolderHandler(getInputVal())}>Submit</button>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        currentFolderId:state.fileSystem.currentItemId,
    }
}

export default WithService()(connect(mapStateToProps,actions)(RenameFolderForm));