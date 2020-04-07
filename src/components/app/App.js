import React, {Component} from "react";
import './App.css';
import FileSystem from '../fileSystem/fileSystem'
import WithService from "../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../redux_components/actions";
import OngoingTasks from "../ongoingTasks/ongoingTasks";
import Statistic from "../statistic/statistic";
import './App.css';

class App extends Component{

    componentDidMount() {
        const {fetchStore} = this.props;
        fetchStore();
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