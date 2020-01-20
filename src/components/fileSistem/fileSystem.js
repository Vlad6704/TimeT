import React from 'react';
import './fileSystem.css';
import  GoToPrev from './goToPrev/goToPrev';
import  GoToHome from './goHome/goHome';
import  Folders from './folders/folders';
import  Tasks from './tasks/tasks';
import  CreateFolderForm from './createFolder/CreateFolderForm/CreateFolderForm';
import  CreateFolderFormButton from './createFolder/createFolderFormButton/createFolderFormButton';
import  CreateNewTaskButton from './createNewTask/createNewTaskButton/createNewTaskButton';
import  CreateNewTaskForm from './createNewTask/createNewTaskForm/createNewTaskForm';
import  RenameFolderButton from './folderOptions/rename/renameFolderButton/RenameFolderButton';
import  RenameFolderForm from './folderOptions/rename/renameFolderForm/RenameFolderForm';
import  RemoveFolderButton from './folderOptions/remove/removeFolderButton/RemoveFolderButton';
import  CutFolderButton from './folderOptions/replace/cutFolderButton/CutFolderButton';
import  PasteFolderButton from './folderOptions/replace/pasteFolderButton/PasteFolderButton';
import {connect} from "react-redux";
import * as actions from "../../redux_components/actions";
import WithService from '../hoc/with-service/with-service'

class FileSystem extends React.Component{


 defaultFolderOptions = (
    <div className={"folderOptions"}>
        <RenameFolderButton />
        {this.props.isOpenRenameFolderForm &&
        <RenameFolderForm  />
        }
        <RemoveFolderButton />
        <CutFolderButton />
    </div>);

    render() {
        const {isOpenCreateFolderForm,isOpenCreateTaskForm,isOpenRenameFolderForm,replaceFolderId} = this.props;
        return(
                <div className="fileSistem">
                    <GoToPrev    />
                    <GoToHome  />
                    <CreateFolderFormButton />
                    {isOpenCreateFolderForm &&
                        <CreateFolderForm  />
                    }
                    <CreateNewTaskButton />
                    {isOpenCreateTaskForm &&
                        <CreateNewTaskForm  />
                    }
                    <Folders />
                    <Tasks />
                    {replaceFolderId === -1 && this.defaultFolderOptions}
                    {replaceFolderId !== -1 &&
                        <PasteFolderButton/>
                    }
                </div>
            )


    }

}

const mapStateToProps = (state) =>{
    return {
        isOpenCreateFolderForm: state.fileSistem.isOpenCreateFolderForm,
        isOpenCreateTaskForm: state.fileSistem.isOpenCreateTaskForm,
        isOpenRenameFolderForm: state.fileSistem.isOpenRenameFolderForm,
        replaceFolderId:state.fileSistem.replaceFolderId,
    }
}

export default WithService()(connect(mapStateToProps,actions)(FileSystem));