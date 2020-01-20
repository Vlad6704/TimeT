import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/actions';
import './folder.css';

const Folders = ({fileSistemObj ,onSerfing,currentItemId}) => {

    return  fileSistemObj.items.map(item => {
        if(currentItemId === item.parentsId){
            return (
                <div className={`folder ${item.isNotAvailable && 'notAvailable'}`}
                     onClick={()=> {
                         if(!item.isNotAvailable) onSerfing(item.id);
                     }}

                >
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