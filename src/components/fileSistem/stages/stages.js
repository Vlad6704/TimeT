import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../redux_components/actions';
import WithService from "../../hoc/with-service/with-service";

const Stages = ({task,stageClickHandler}) => {


    const getStagesArr =  task.stages.map(item => {
        return (
            <div className={"stage"}
                onClick={()=>stageClickHandler(task.id,item.id)}
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