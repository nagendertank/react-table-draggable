import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips,getData } from "./Utils";
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import Dragable from './HOC/Drag';
import './App.css'
import Chance from 'chance';

const DraggableTable = Dragable(ReactTable);
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: getData(makeData()),
      trigger: 0
    };
  

    this.renderEditable = this.renderEditable.bind(this);
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        onClick = {e=>{

        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
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
        Cell:this.renderEditable
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

