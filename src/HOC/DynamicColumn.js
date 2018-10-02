/* eslint-disable */

import React from 'react'
import { Form, Icon, Popup, Checkbox, Button } from 'semantic-ui-react'
import _ from "lodash";
import ReactTable from "react-table";

export default class RTDynamicTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: props.columns,
            isDynamicColumn: props.isDynamicColumn
        }

        this.getColumns = this.getColumns.bind(this);
    }


    getWrappedInstance() {
        if (!this.wrappedInstance) console.warn('RTSelectTable - No wrapped instance')
        if (this.wrappedInstance.getWrappedInstance) return this.wrappedInstance.getWrappedInstance()
        else return this.wrappedInstance
    }

    selecteCheckbox(val) {
        let { columns: defaultColumns } = this.state;

        if (!val.checked) {
            let dynamicObjIndex = _.findIndex(defaultColumns, function (o) { return o.accessor === val.key });
            defaultColumns[dynamicObjIndex].show = true;
        } else {
            let dynamicObjIndex = _.findIndex(defaultColumns, function (o) { return o.accessor === val.key });
            defaultColumns[dynamicObjIndex].show = false;
        }

        this.setState({ columns: defaultColumns });
    }

    headSelector(row) {

        let { columns: defaultColumns } = this.state;

        defaultColumns = defaultColumns.filter((val) => {
            return val.id !== '_selector';
        })

        let checkBoxMap = defaultColumns.map((val) => {
            if (val.show || val.show === undefined) {
                return {
                    key: val.accessor,
                    value: val.Header,
                    checked: true
                }
            } else {
                return {
                    key: val.accessor,
                    value: val.Header,
                    checked: false
                }
            }
        })

        let checkBoxElements = <Form>
            <Form.Group grouped>
                {
                    checkBoxMap.map((val, index) => {
                        return (
                            <Form.Field>
                                <Checkbox label={val.value} key={index} checked={val.checked} onClick={() => { this.selecteCheckbox(val) }} />
                            </Form.Field>
                        )
                    })
                }
            </Form.Group>
        </Form>

        return <Popup on="click"
            position="bottom right"
            trigger={<Button primary className='basic  icon transparent' >
                <Icon className='circle plus' />
            </Button>}
            content={checkBoxElements} />

    }

    getColumns() {
        let self = this;
        let columns = [];
        this.state.columns.forEach((data, index) => {
            columns.push(data);
        });

        if (this.state.isDynamicColumn) {
            const select = {
                id: '_selector',
                accessor: () => 'x', // this value is not important
                Header: this.headSelector.bind(this),
                Cell: ci => {
                    return null
                },
                width: 30,

                filterable: false,
                sortable: false,
                resizable: false,
                headerClassName: 'expandHeader'
            }
            columns.push(select);
        }

        return columns;
    }

    render() {
        const {
            columns,
            isDynamicColumn,
            ...rest
        } = this.props

        let tableColumns = this.getColumns();

        return (
            <ReactTable {...rest} columns={tableColumns} ref={r => (this.wrappedInstance = r)} />
        );
    }
}
