import React from 'react';
import './fileSistem.css';
import  GoToPrev from './goToPrev/goToPrev';
import  GoToHome from './goHome/goHome';
import  Folders from './folders/folders';
import  OpenCreateFolderForm from './createFolder/openCreateFolderForm/openCreateFolderForm';
import  CreateFolderForm from './createFolder/createFolderForm/createFolderForm';

export default class FileSistem extends React.Component{


// getPrevId = ()=>{
//     let prevId = -1;
//     this.props.fileSistemObj.items.forEach((item)=> {
//         if(item.id === this.props.fileSistemObj.currentItemId) prevId = item.parentsId
//     });
//     return prevId;
// }


    render() {
        console.log(this.props.fileSistemObj);
        return(
                <div className="fileSistem">
                    <GoToPrev
                    //     onGoToPrev = {
                    //
                    //     ()=> this.props.onSerfing(this.getPrevId())
                    // }
                    />
                    <GoToHome
                        // onGoToHome = {
                        //     ()=> this.props.onSerfing(this.props.settings.fileSistem.homeLevelId)
                        //  }
                    />
                    <OpenCreateFolderForm onCreateFolder = {
                            ()=> this.props.onSerfing(this.props.settings.fileSistem.homeLevelId)
                         }
                    />
                    < CreateFolderForm />
                    <Folders
                        //fileSistemObj = {this.props.fileSistemObj}
                        //currentItemId = {this.props.fileSistemObj.currentItemId}
                        //onSerfing = {this.props.onSerfing}
                    />
                </div>
            )


    }

}