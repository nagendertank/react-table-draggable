import React from "react";
import { makeData, Logo, Tips,getData } from "./Utils";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import DynamicTableColumn from './HOC/Drag';
import './App.css'
import 'semantic-ui-css/semantic.min.css';

const DragTable = DynamicTableColumn(ReactTable)

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
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
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
      },
      {
        Header: "Age",
        accessor: "age",
        show:false
      },
      {
        Header: "Progress",
        accessor: "progress",
        show:false
      }
    ];

   
    return (
      <div>
        <DragTable
            ref={r => (this.draggableTable = r)}
            columns={columns}
            data = {data}
            defaultPageSize={10}
            className="-striped -highlight"
            isDynamicColumn = {true}
          />
      
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

