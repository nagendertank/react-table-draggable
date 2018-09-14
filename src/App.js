import React from "react";
import { makeData, Logo, Tips,getData } from "./Utils";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import Dragable from './HOC/Drag';
import './App.css'


const DraggableTable = Dragable(ReactTable);
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: getData(makeData()),
      trigger: 0
    };
  }
  

  render() {
    const { data } = this.state;
    let columns = [
      {
        Header: "First Name",
        accessor: "firstName",
       
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Full Name",
        id: "full",
        accessor: d =>
          <div
            dangerouslySetInnerHTML={{
              __html: d.firstName + " " + d.lastName
            }}
          />
      }
    ];


   
    return (
      <div>
        <DraggableTable
            ref={r => (this.draggableTable = r)}
            columns={columns}
            data = {data}
            defaultPageSize={10}
            className="-striped -highlight"
            onDragChange={data=>this.setState({data})}
          />
      
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

