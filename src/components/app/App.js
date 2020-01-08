import React, {Component} from "react";
import './App.css';
import FileSistem from '../fileSistem/fileSistem'
import WithService from "../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../redux_components/actions";
import OngoingTasks from "../ongoingTasks/ongoingTasks";
import Statistic from "../statistic/statistic";


class App extends Component{

    componentDidMount() {
        const {service, setStore} = this.props;

        service.getStore().then((response) =>{
            // console.log(response.data);
            setStore(response.data);
        }, (error) =>{
            console.log(error)
        });

    }


  render() {
    return(
        <section>
            <OngoingTasks/>
            <FileSistem />
            <Statistic />
        </section>
    )
  }
}

const mapStateToProps = (state)=>{
    return {

    }
}


export default WithService()(connect(mapStateToProps,actions)(App));