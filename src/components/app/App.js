import React, {Component} from "react";
import './App.css';
import AddTask from '../addTask/addTask'
import FileSistem from '../fileSistem/fileSistem'

export default class App extends Component{



  setFileSistemCurrentItemId = (id)=>{
    this.setState(({fileSistem})=>{
        const OldFileSistem = fileSistem;
        OldFileSistem.currentItemId = id;

        return {fileSistem: OldFileSistem}

    })
  }
    openCreateFolderForm= ()=>{
        this.setState(({fileSistem})=>{
            return {}

        })
    }
  render() {
    return(
        <section>
          <AddTask />
          <FileSistem
              //fileSistemObj = {this.state.fileSistem}
              //onSerfing={this.setFileSistemCurrentItemId}
              //settings={this.settings}
          />
        </section>
    )
  }
}
