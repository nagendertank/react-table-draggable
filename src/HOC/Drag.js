/* eslint-disable */

import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactTable from 'react-table';
import { makeData, Logo, Tips,getData } from "../Utils";


const defaultSelectInputComponent = props => {
    
    this.onMouseOver = (event)=>{
        event.target.classList.add("fa");
        event.target.classList.add("fa-arrows");
    }

    this.onMouseOut = (event) => {
        event.target.classList.remove("fa");
        event.target.classList.remove("fa-arrows");
    }

    return (
        <div className="drag-row" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}></div>
    )
}



const DragTrComponent = props =>{
    const { children = null, rowInfo } = props;
    
    if (rowInfo) {
        const { original, index } = rowInfo;
        const { _id } = original;
       
        return (
            <Draggable key={_id} index={index} draggableId={_id}>
                {(draggableProvided, draggableSnapshot) => (
                    <div className='dragComponent'
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                    >
                        <ReactTable.defaultProps.TrComponent>
                            {children}
                        </ReactTable.defaultProps.TrComponent>
                    </div>
                )}
            </Draggable>
        );
    } else
        return (
            <ReactTable.defaultProps.TrComponent>
                {children}
            </ReactTable.defaultProps.TrComponent>
        );
}

const DropTbodyComponent = props=> {
    
        const { children = null } = props;

        return (
            <Droppable droppableId="droppable">
                {(droppableProvided, droppableSnapshot) => (
                    <div ref={droppableProvided.innerRef}>
                        <ReactTable.defaultProps.TbodyComponent>
                            {children}
                        </ReactTable.defaultProps.TbodyComponent>
                    </div>
                )}
            </Droppable>
        );
}

const TdComponent = props => {

    const { children = null } = props;
   

    return (
            <ReactTable.defaultProps.TdComponent {...props} tabIndex={0}>
                        {children}
                </ReactTable.defaultProps.TdComponent>
    );
}

export default Component => {
    const wrapper = class RTSelectTable extends React.Component {
        constructor(props) {
            super(props)
           
            this.handleDragEnd = this.handleDragEnd.bind(this);
            this.state = {
                data:props.data
            }
        }

        componentWillReceiveProps(nextProps){
            this.setState({
                data:nextProps.data
            })
        }

        rowSelector(row) {
            return React.createElement(this.props.SelectInputComponent, {})
        }

         reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        };


        // this is so we can expose the underlying ReactTable to get at the sortedData for selectAll
        getWrappedInstance() {
            if (!this.wrappedInstance) console.warn('RTSelectTable - No wrapped instance')
            if (this.wrappedInstance.getWrappedInstance) return this.wrappedInstance.getWrappedInstance()
            else return this.wrappedInstance
        }

        handleDragEnd = result => {
            let oldData = [...this.state.data]
            if(!result || !result.source)
                return;
            let newData = this.reorder(oldData, result.source.index,
                result.destination.index);
            
            if (this.props.onDragChange){
                this.props.onDragChange(newData);
            }else{
                this.setState({
                    data:newData
                })
            }
        };

        getTrProps = (state, rowInfo) => {
          //  console.log(rowInfo);
            return { rowInfo };
        };

        
        render() {
            const {
                columns: originalCols,
                selectWidth,
                SelectAllInputComponent,
                SelectInputComponent,
                data,
                ...rest
            } = this.props
          
            const columns = [...originalCols]
            const extra = {
                columns
            }
           
            return (
                <DragDropContext onDragEnd={this.handleDragEnd}>
                    <Component {...rest} {...extra} ref={r => (this.wrappedInstance = r)} TrComponent={DragTrComponent}
                    TbodyComponent={DropTbodyComponent} 
                        getTrProps={this.getTrProps} onSortedChange={this.onSortedChange} data={this.state.data} TdComponent={TdComponent}/>
                </DragDropContext>
            );
        }
    }

    wrapper.displayName = 'RTSelectTable'
    wrapper.defaultProps = {
        keyField: '_id',
        SelectInputComponent: defaultSelectInputComponent,
        SelectAllInputComponent: defaultSelectInputComponent,
    }

    return wrapper
}
