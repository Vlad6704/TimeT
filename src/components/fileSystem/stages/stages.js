import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/fileSystem/fileSystemActions';
import WithService from "../../hoc/with-service/with-service";

const Stages = ({task,startTaskHandler}) => {


    const getStagesArr =  task.stages.map(item => {
        return (
            <div className={"stage"}
                onClick={()=>startTaskHandler(task.id,item.id)}
            >
                StageName: {item.name}
                {item.status == 'creating' && `, status: ${item.status}`}
            </div>
        )

    })



    return (
        <div className={'stages'} >
            {getStagesArr}
        </div>

    )


};

const mapStateToProps = ()=>{
    return {}
}


export default WithService()(connect(mapStateToProps,actions)(Stages));