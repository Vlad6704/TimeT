import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/actions';
import './folder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

const Folders = ({fileSistemObj ,onSerfing,currentItemId}) => {

    return  fileSistemObj.items.map(item => {
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
        fileSistemObj: state.fileSistem,
        currentItemId: state.fileSistem.currentItemId,
    }
}

export default connect(mapStateToProps,actions)(Folders);