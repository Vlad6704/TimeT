import React from 'react';
import './fileSistem.css';
import  GoToPrev from './goToPrev/goToPrev';
import  Folders from './folders/folders';

export default class FileSistem extends React.Component{


getPrevId = ()=>{
    let prevId = -1;
    this.props.fileSistemObj.items.forEach((item)=> {
        if(item.id === this.props.fileSistemObj.currentItemId) prevId = item.parentsId
    });
    return prevId;
}


    render() {
        console.log(this.props.fileSistemObj);
        return(
                <div className="fileSistem">
                    <GoToPrev onGoToPrev = {

                        ()=> this.props.onSerfing(this.getPrevId())
                         }
                    />

                    <Folders
                        fileSistemObj = {this.props.fileSistemObj}
                        currentItemId = {this.props.fileSistemObj.currentItemId}
                        onSerfing = {this.props.onSerfing}
                    />
                </div>
            )


    }

}