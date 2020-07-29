import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../redux_components/ongoingTasks/ongoingTasksActions";
import WithService from "../hoc/with-service/with-service";
import './ongoingTasks.css';
import Moment from 'moment';
import {extendMoment} from "moment-range";
import SoundReminder from "../soundReminder/soundReminder";
import OngoingTasksItems from './ongoingTasksItems/ongoingTasksItems';

const moment = extendMoment(Moment);

class OngoingTasks extends React.Component {




    render() {
        const {ongoingTasksArr,tasks,stopTaskHandler,switchableHandler, switchableTaskId, isEnableSoundReminder} = this.props;


        return (
            <>
                {ongoingTasksArr.length > 0 &&

                    <div className="ongoing-tasks-panel">
                        {isEnableSoundReminder &&
                            <SoundReminder/>
                        }
                        <div className={'ongoing-tasks'} >
                            <OngoingTasksItems ongoingTasksArr={ongoingTasksArr} tasks={tasks} stopTaskHandler={stopTaskHandler} switchableHandler={switchableHandler}  switchableTaskId={switchableTaskId} />
                        </div>
                    </div>

                }
            </>
        )

    }
}




const mapStateToProps = (state)=>{
    return {
        ongoingTasksArr:state.ongoingTasks.items,
        isEnableSoundReminder:state.ongoingTasks.isEnableSoundReminder,
        tasks:state.tasks.items,
        switchableTaskId: state.ongoingTasks.switchableTaskId,
        timeTaskArr:state.timeTaskArr,
        app_options:state.appOptions,
    }

}

export default WithService()(connect(mapStateToProps,actions)(OngoingTasks));