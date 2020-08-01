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
    constructor(props) {
        super(props);
        this.ongoingTasksWrapperRef = React.createRef();
        this.ongoingTasksRef = React.createRef();

    }

    state = {
        ongoingTasksWrapperHeight: false,
        useDropDown: false,
        isPanelOpen: false,
    }

    dropDownPanel() {
        if(!this.state.useDropDown) return;
        const ongoingTasksWrapper = this.ongoingTasksWrapperRef.current;
        const ongoingTasks = this.ongoingTasksRef.current;
        if(!this.state.ongoingTasksWrapperHeight) this.setState({ongoingTasksWrapperHeight: ongoingTasksWrapper.clientHeight});
        ongoingTasksWrapper.style.height = ongoingTasks.clientHeight+'px';
        this.setState({isPanelOpen:true});


    }

    liftUpPanel() {
        const ongoingTasksWrapper = this.ongoingTasksWrapperRef.current;
        ongoingTasksWrapper.style.height = this.state.ongoingTasksWrapperHeight+ 'px';
        this.setState({isPanelOpen:false});
    }

    showOrHideDropDownButton() {
        const ongoingTasksWrapper = this.ongoingTasksWrapperRef.current;
        const ongoingTasks = this.ongoingTasksRef.current;

        let ongoingTasksWrapperHeight;
        if(this.state.ongoingTasksWrapperHeight) ongoingTasksWrapperHeight = this.state.ongoingTasksWrapperHeight;
        else ongoingTasksWrapperHeight = ongoingTasksWrapper.clientHeight;

        if(ongoingTasksWrapperHeight < ongoingTasks.clientHeight){
            if(this.state.useDropDown) return;
            this.setState({useDropDown:true});
        }
        else{
            if(!this.state.useDropDown) return;
            this.setState({useDropDown: false});
        }

    }

    componentDidMount() {
        this.showOrHideDropDownButton();
    }

    componentDidUpdate(prevProps, prevState) {
        this.showOrHideDropDownButton();
    }

    enterHandler() {
        this.dropDownPanel();
    }

    leaveHandler() {
        this.liftUpPanel();
    }

    dropDownButtonHandler(ev) {
        ev.stopPropagation();
        if(this.state.isPanelOpen) this.liftUpPanel();
        else this.dropDownPanel();
    }

    render() {
        const {ongoingTasksArr,tasks,stopTaskHandler,switchableHandler, switchableTaskId, isEnableSoundReminder} = this.props;


        return (
            <>


                <div className={`ongoing-tasks-panel ${this.state.isPanelOpen ? 'ongoing-tasks-panel_open' : ''}`} onMouseOver={() => this.enterHandler()} onMouseOut={() => this.leaveHandler()}>
                    {isEnableSoundReminder &&
                        <SoundReminder/>
                    }
                    <div className={"ongoing-tasks-wrapper"} ref={this.ongoingTasksWrapperRef}>
                        <div className={'ongoing-tasks'} ref={this.ongoingTasksRef}>
                            <OngoingTasksItems ongoingTasksArr={ongoingTasksArr} tasks={tasks} stopTaskHandler={stopTaskHandler} switchableHandler={switchableHandler}  switchableTaskId={switchableTaskId} />
                        </div>
                    </div>
                    {this.state.useDropDown &&
                        <div className={"ongoing-tasks-panel__dropDown-button button"} onTouchStart={(ev) => this.dropDownButtonHandler(ev)}>
                            <i className={"icon-down-arrow ongoing-tasks-panel__dropDown-icon"}></i>
                        </div>
                    }
                </div>


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