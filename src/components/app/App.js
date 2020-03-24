import React, {Component} from "react";
import './App.css';
import FileSystem from '../fileSistem/fileSystem'
import WithService from "../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../redux_components/actions";
import OngoingTasks from "../ongoingTasks/ongoingTasks";
import Statistic from "../statistic/statistic";
import './App.css';

class App extends Component{

    componentDidMount() {
        const {service,setTimeTask, setStore,setSwitchableOngoingTask,ongoingTasksArr} = this.props;

        service.getStore().then((response) =>{
            // console.log(response.data);
            setStore(response.data);
            if(response.data.activeTask[0]) setSwitchableOngoingTask(response.data.activeTask[0].id);
        }, (error) =>{
            console.log(error)
        });
        service.getTimeTask().then((response) => {

            setTimeTask(response.data);

        },(error)=>{

        })

    }


  render() {
    return(
        <section>
            <OngoingTasks/>
            <FileSystem />
            <Statistic />
        </section>
    )
  }
}

const mapStateToProps = (state)=>{
    return {
        ongoingTasksArr:state.ongoingTasksArr
    }
}


export default WithService()(connect(mapStateToProps,actions)(App));