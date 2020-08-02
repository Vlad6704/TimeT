import React from 'react';
import './fileSystem.css';
import PropTypes from 'prop-types';
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
import RenameTaskForm from "./taskOptions/rename/RenameTaskForm/RenameTaskForm";
import ToolPanel from "../toolPanel/toolPanel";

class FileSystem extends React.Component{


 defaultFolderOptions = () => {
    const {currentFolderId} = this.props;

    return (<div className={`folder-options fileSystem-tools__folder-options ${currentFolderId === -1 ? 'folder-options_not-active':''}`}>
            <RenameFolderButton />
            {this.props.isOpenRenameFolderForm &&
            <RenameFolderForm />
            }
            <CutFolderButton />
            <RemoveFolderButton />
        </div>);
    }
    render() {
        const {isOpenCreateFolderForm,isOpenCreateTaskForm,isOpenTaskOptionsPanel,replaceFolderId, isOpenRenameTaskForm} = this.props;

        return(
            <section className="fileSystem-wrapper">
                <OngoingTasks/>
                <div className={"fileSystem"}>
                    <GoToPrev    />
                    <Folders />
                    <Tasks />
                </div>
                <ToolPanel>
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
                        {isOpenTaskOptionsPanel  &&
                        <TaskOptionsPanel />
                        }
                        {isOpenRenameTaskForm &&
                        <RenameTaskForm />
                        }

                        <RegularTools />

                    </div>

                </ToolPanel>
            </section>

            )


    }

}

FileSystem.propTypes = {
    isOpenCreateFolderForm: PropTypes.bool.isRequired,
    isOpenCreateTaskForm: PropTypes.bool.isRequired,
    isOpenTaskOptionsPanel: PropTypes.bool.isRequired,
    replaceFolderId: PropTypes.number.isRequired,
    isOpenRenameTaskForm: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) =>{
    return {
        isOpenCreateFolderForm: state.fileSystem.isOpenCreateFolderForm,
        isOpenCreateTaskForm: state.fileSystem.isOpenCreateTaskForm,
        isOpenRenameFolderForm: state.fileSystem.isOpenRenameFolderForm,
        replaceFolderId:state.fileSystem.replaceFolderId,
        isOpenTaskOptionsPanel:state.fileSystem.taskOptionsPanel.isOpen,
        currentFolderId: state.fileSystem.currentItemId,
        isOpenRenameTaskForm: state.fileSystem.isOpenRenameTaskForm,
    }
}

export default WithService()(connect(mapStateToProps,actions)(FileSystem));