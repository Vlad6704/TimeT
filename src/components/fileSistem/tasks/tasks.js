import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/actions';

const Tasks = ({tasks ,onClick,currentItemId}) => {

    return  tasks.map(item => {
        if(currentItemId === item.folderId){
            return (
                <div className={"task"}

                >
                    {item.name}

                </div>
            )
        }
    })
}

const mapStateToProps = (state) =>{
    return {
        tasks: state.tasks,
        currentItemId: state.fileSistem.currentItemId,
    }
}

export default connect(mapStateToProps,actions)(Tasks);