import React from 'react'
import {connect} from 'react-redux';
import {onSerfing} from '../../../redux_components/fileSystem/fileSystemActions'
import './folder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';


const Folders = ({fileSystemObj ,onSerfing,currentItemId}) => {

    return  fileSystemObj.items.map(item => {
        if(currentItemId === item.parentsId){
            return (
                <div key={item.id}
                     className={`folder button  ${item.isNotAvailable && 'notAvailable'}`}
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

Folders.propTypes = {
    fileSystemObj: PropTypes.object.isRequired,
    onSerfing: PropTypes.func.isRequired,
    currentItemId: PropTypes.number.isRequired,
}

const mapStateToProps = (state) =>{
    return {
        fileSystemObj: state.fileSystem,
        currentItemId: state.fileSystem.currentItemId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSerfing: (id) => dispatch(onSerfing(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Folders);