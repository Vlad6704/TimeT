import React from 'react'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as actions from "../../redux_components/ongoingTasks/ongoingTasksActions";
import WithService from "../hoc/with-service/with-service";
import './ongoingTasks.css';
import SoundReminder from "../soundReminder/soundReminder";
import OngoingTasksItems from './ongoingTasksItems/ongoingTasksItems';
import {
    isBrowser,
    isMobile
} from "react-device-detect";

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
        if(this.state.isPanelOpen) return;
        const ongoingTasksWrapper = this.ongoingTasksWrapperRef.current;
        const ongoingTasks = this.ongoingTasksRef.current;
        if(!this.state.ongoingTasksWrapperHeight) this.setWrapperHeight(ongoingTasksWrapper.clientHeight);
        ongoingTasksWrapper.style.height = ongoingTasks.clientHeight+'px';
        this.setState({isPanelOpen:true});


    }

    setWrapperHeight(height) {
        this.setState({ongoingTasksWrapperHeight: height})
    }

    liftUpPanel() {
        if(!this.state.isPanelOpen) return;
        const ongoingTasksWrapper = this.ongoingTasksWrapperRef.current;
        ongoingTasksWrapper.style.removeProperty('height');
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

        if(this.state.isPanelOpen) {
            this.liftUpPanel();
        }

    }



    componentDidMount() {
        this.showOrHideDropDownButton();
    }

    componentDidUpdate(prevProps, prevState) {
        this.showOrHideDropDownButton();
    }

    enterHandler() {
        if(isBrowser) this.dropDownPanel();
    }

    leaveHandler() {
        if(isBrowser) this.liftUpPanel();
    }

    dropDownButtonHandler(ev) {
        if(this.state.isPanelOpen) this.liftUpPanel();
        else this.dropDownPanel();
        ev.stopPropagation();
    }

    render() {
        const {ongoingTasksArr,tasks,stopTaskHandler,switchableHandler, switchableTaskId, isEnableSoundReminder} = this.props;

        let ongoingTasksPanelClasses;
        if(this.state.isPanelOpen) ongoingTasksPanelClasses +=' ongoing-tasks-panel_open';
        if(ongoingTasksArr.length) ongoingTasksPanelClasses +=' ongoing-tasks-panel_tasks-is-running';
        return (
            <>


                <div className={`ongoing-tasks-panel ${ongoingTasksPanelClasses}`} >
                    {isEnableSoundReminder &&
                        <SoundReminder/>
                    }
                    <div className="ongoing-tasks-logo">
                        <div className="ongoing-tasks-logo__inner">
                            <i className={"icon-clock-solid ongoing-tasks-logo__icon"}></i>
                            <span className="ongoing-tasks-logo__title">TimeT</span>
                        </div>
                    </div>
                    <div className={"ongoing-tasks-wrapper"} ref={this.ongoingTasksWrapperRef} onMouseOver={() => this.enterHandler()} onMouseOut={() => this.leaveHandler()}>
                        <div className={'ongoing-tasks'} ref={this.ongoingTasksRef}>
                            <OngoingTasksItems ongoingTasksArr={ongoingTasksArr} tasks={tasks} stopTaskHandler={stopTaskHandler} switchableHandler={switchableHandler}  switchableTaskId={switchableTaskId} />
                        </div>
                    </div>
                    {this.state.useDropDown &&
                        <div className={"ongoing-tasks-panel__dropDown-button button"} onClick={(ev) => this.dropDownButtonHandler(ev)}>
                            <i className={"icon-down-arrow ongoing-tasks-panel__dropDown-icon"}></i>
                        </div>
                    }
                </div>


            </>
        )

    }
}


OngoingTasks.propTypes = {
    ongoingTasksArr: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired,
    stopTaskHandler: PropTypes.func.isRequired,
    switchableHandler: PropTypes.func.isRequired,
    switchableTaskId: PropTypes.number.isRequired,
    isEnableSoundReminder: PropTypes.bool.isRequired,
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