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
import  TaskOptionsPanel from './taskOptions/TaskOptionsPanel';
import {connect} from "react-redux";
import * as actions from "../../redux_components/fileSystem/fileSystemActions";
import WithService from '../hoc/with-service/with-service'
import OngoingTasks from "../ongoingTasks/ongoingTasks";
import RegularTools from '../regularTools/regularTools';

class FileSystem extends React.Component{


 defaultFolderOptions = () => (
    <div className={"folder-options fileSystem-tools__folder-options"}>
        <RenameFolderButton />
        {this.props.isOpenRenameFolderForm &&
        <RenameFolderForm />
        }
        <CutFolderButton />
        <RemoveFolderButton />
    </div>);

    render() {
        const {isOpenCreateFolderForm,isOpenCreateTaskForm,optionsPanelIsOpenForTask,replaceFolderId} = this.props;
        return(
            <section className="fileSystem-wrapper">
                <OngoingTasks/>
                <div className={"fileSystem"}>
                    <GoToPrev    />
                    <Folders />
                    <Tasks />
                </div>
                <div className="fileSystem-tools bottom-tools">
                    <GoToHome  />

                    <CreateNewTaskButton />
                    {isOpenCreateTaskForm &&
                    <CreateNewTaskForm  />
                    }

                    <CreateFolderFormButton />
                    {isOpenCreateFolderForm &&
                    <CreateFolderForm  />
                    }

                    {replaceFolderId === -1 && this.defaultFolderOptions()}
                    {replaceFolderId !== -1 &&
                    <PasteFolderButton/>
                    }
                    {optionsPanelIsOpenForTask !== -1 &&
                    <TaskOptionsPanel />
                    }
                    <RegularTools />

                </div>
            </section>

            )


    }

}

const mapStateToProps = (state) =>{
    return {
        isOpenCreateFolderForm: state.fileSystem.isOpenCreateFolderForm,
        isOpenCreateTaskForm: state.fileSystem.isOpenCreateTaskForm,
        isOpenRenameFolderForm: state.fileSystem.isOpenRenameFolderForm,
        replaceFolderId:state.fileSystem.replaceFolderId,
        optionsPanelIsOpenForTask:state.fileSystem.taskOptionsPanel.optionsPanelIsOpenForTask,
    }
}

export default WithService()(connect(mapStateToProps,actions)(FileSystem));