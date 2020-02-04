import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/actions';
import {faFolder} from "@fortawesome/free-solid-svg-icons/faFolder";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './folders.css';


const Folders = ({fileSistemObj ,onSerfing,currentItemId}) => {

    return  fileSistemObj.items.map(item => {
        if(currentItemId === item.parentsId){
            return (
                <div className={"folder cursPointSelNon"}
                     onClick={()=> onSerfing(item.id)}
                >
                    <FontAwesomeIcon icon={faFolder} />
                    <span className={'title'}>
                        {item.name}
                    </span>
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