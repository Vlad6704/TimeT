import React, {Component} from "react";
import './App.css';
import FileSystem from '../fileSystem/fileSystem'
import WithService from "../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../redux_components/actions";
import OngoingTasks from "../ongoingTasks/ongoingTasks";
import Statistic from "../statistic/statistic";
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Login from '../login/login';
import Registration from '../registration/registration';
import {bindActionCreators} from "redux";
import Header from "../header/header";


class App extends Component{

    componentDidMount() {
        const {fetchStore} = this.props;
        fetchStore();
    }


    render() {
        const {redirectToLogIn} = this.props;

        return(
            <section>
                {redirectToLogIn &&
                    <Redirect
                        to={{pathname: "/login"}}
                    />
                }


                <Route path = "/" exact component = {FileSystem}/>
                <Route path = "/login" exact component = {Login}/>
                <Route path = "/registration" component = {Registration}/>
                <Route path = "/statistics" component = {Statistic}/>
            </section>

        )
    }
}

const mapStateToProps = (state)=>{
    return {
        ongoingTasksArr:state.ongoingTasksArr,
        redirectToLogIn:state.user.redirectToLogIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({...actions},dispatch);
}


export default WithService()(connect(mapStateToProps,mapDispatchToProps)(App));