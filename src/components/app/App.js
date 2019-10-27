import React, {Component} from "react";
import './App.css';
import AddTask from '../addTask/addTask'
import FileSistem from '../fileSistem/fileSistem'

export default class App extends Component{




  render() {
    return(
        <section>
          <AddTask />
          <FileSistem />
        </section>
    )
  }
}
