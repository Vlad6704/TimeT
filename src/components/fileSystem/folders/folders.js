import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/actions';
import './folder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

const Folders = ({fileSystemObj ,onSerfing,currentItemId}) => {

    return  fileSystemObj.items.map(item => {
        if(currentItemId === item.parentsId){
            return (
                <div className={`folder cursPointSelNon  ${item.isNotAvailable && 'notAvailable'}`}
                     onClick={()=> {
                         if(!item.isNotAvailable) onSerfing(item.id);
                     }}

                >
                    <FontAwesomeIcon icon={faFolder} />
                    {item.name}

                </div>
            )
        }
    })
}

const mapStateToProps = (state) =>{
    return {
        fileSystemObj: state.fileSystem,
        currentItemId: state.fileSystem.currentItemId,
    }
}

export default connect(mapStateToProps,actions)(Folders);