import React, {Component} from "react";
import './App.css';
import AddTask from '../addTask/addTask'
import FileSistem from '../fileSistem/fileSistem'

export default class App extends Component{

  state = {
      tasks:[],
      fileSistem:{
          items:  [
              {
                  id:1,
                  name:"work",
                  children:[{id:2},],
                  parentsId:-1,
                  tasks:[
                      {},
                      {}
                  ],


              },
              {
                  id:2,
                  name:"site",
                  children:[{id:3},],
                  parentsId:1,
                  tasks:[
                      {},
                      {}
                  ],


              },
              {
                  id:3,
                  name:"sinerg",
                  children:[],
                  parentsId:2,
                  tasks:[
                      {},
                      {}
                  ],


              },
              {
                  id:4,
                  name:"food",
                  children:[],
                  parentsId:-1,
                  tasks:[
                      {},
                      {}
                  ],


              },

          ],
          currentItemId:-1,
      }

  }


  setFileSistemCurrentItemId = (id)=>{
    this.setState(({fileSistem})=>{
        const OldFileSistem = fileSistem;
        OldFileSistem.currentItemId = id;

        return {fileSistem: OldFileSistem}

    })
  }

  render() {
    return(
        <section>
          <AddTask />
          <FileSistem fileSistemObj = {this.state.fileSistem} onSerfing={this.setFileSistemCurrentItemId}/>
        </section>
    )
  }
}
