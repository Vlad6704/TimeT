import React from 'react';
import './fileSistem.css';
import  GoToPrev from './goToPrev/goToPrev';
import  GoToHome from './goHome/goHome';
import  Folders from './folders/folders';
import  Tasks from './tasks/tasks';
import  CreateFolderForm from './createFolder/CreateFolderForm/CreateFolderForm';
import  CreateFolderFormButton from './createFolder/createFolderFormButton/createFolderFormButton';
import  CreateNewTaskButton from './createNewTask/createNewTaskButton/createNewTaskButton';
import  CreateNewTaskForm from './createNewTask/createNewTaskForm/createNewTaskForm';
import {connect} from "react-redux";
import * as actions from "../../redux_components/actions";
import WithService from '../hoc/with-service/with-service'

class FileSistem extends React.Component{




    render() {
        const {isOpenCreateFolderForm,isOpenCreateTaskForm} = this.props;
        return(
                <div className="fileSistem">
                    <GoToPrev
                    />
                    <GoToHome
                    />
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
                </div>
            )


    }

}

const mapStateToProps = (state) =>{
    return {
        isOpenCreateFolderForm: state.fileSistem.isOpenCreateFolderForm,
        isOpenCreateTaskForm: state.fileSistem.isOpenCreateTaskForm
    }
}

export default WithService()(connect(mapStateToProps,actions)(FileSistem));