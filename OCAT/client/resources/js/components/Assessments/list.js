import React, { useState, useEffect } from 'react';
import { AssessmentService } from '../shared/services/assessment.service';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

export function AssessmentList() {

    const [columnsArray, setColumnsArray] = useState([]);

    useEffect(function fetch() {
        (async function () {
            const resData = await AssessmentService.retrieveAll();
            const columnedData = []
            resData.data.forEach(assessment => {

                let dateOfBirth = Date.parse(assessment.cat_date_of_birth);
                dateOfBirth = new Date(dateOfBirth);
                dateOfBirth = dateOfBirth.toLocaleDateString("en-US");

                let createdAt = Date.parse(assessment.created_at);
                createdAt = new Date(createdAt);
                createdAt = createdAt.toLocaleString("en-US");

                columnedData.push(
                    {
                        column1: assessment.id,
                        column2: assessment.cat_name,
                        column3: dateOfBirth,
                        column4: assessment.instrument,
                        column5: assessment.risk_level,
                        column6: assessment.score + '',
                        column7: createdAt,
                    })
            });
            setColumnsArray(columnedData);
        })();
    }, []);

    const tableColumns = createTableColumns();
    const tableData = createTableDate();
    const table = createTable(tableColumns, tableData);
    const alternativeDisplay = createAlternativeDisplay();

    let display = columnsArray.length > 0 ? table : alternativeDisplay;

    return display;

    function createTableColumns() {
        const columns = React.useMemo(
            () => [
                {
                    Header: 'ID',
                    accessor: 'column1',
                    sortType: 'basic',
                    Filter: DefaultColumnFilter,

                    isSortedDesc: true

                },
                {
                    Header: 'Name',
                    accessor: 'column2',
                    sortType: 'basic',
                    Filter: DefaultColumnFilter,
                    isSortedDesc: true
                },
                {
                    Header: 'Date of Birth',
                    accessor: 'column3',
                    sortType: 'basic',
                    Filter: DefaultColumnFilter,
                    disableSortBy: true
                },
                {
                    Header: 'Instrument',
                    accessor: 'column4',
                    //sortType: 'basic',
                    Filter: DefaultColumnFilter,
                    disableSortBy: true
                },
                {
                    Header: 'Risk Level',
                    accessor: 'column5',
                    // sortType: 'basic',
                    Filter: DefaultColumnFilter,
                    disableSortBy: true
                },
                {
                    Header: 'Score',
                    accessor: 'column6',
                    sortType: 'basic',
                    Filter: DefaultColumnFilter,
                    isSortedDesc: true
                },
                {
                    Header: 'Created at',
                    accessor: 'column7',
                    // sortType: 'basic', 
                    Filter: DefaultColumnFilter,
                    disableSortBy: true
                },
            ],
            []
        );

        return columns;
    }

    function createTableDate() {
        return React.useMemo(() => columnsArray, [columnsArray]);
    }

    function createTable(columns, data) {
        const defaultColumn = React.useMemo(
            () => ({
                // Default Filter UI
                Filter: DefaultColumnFilter,
            }),
            []
        )
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows, preGlobalFilteredRows,
            setGlobalFilter, state,
            prepareRow
        } = useTable({
            columns,
            data, disableSortBy: false,
            defaultColumn
        }, useFilters,
            useGlobalFilter, useSortBy);

        let uniqueListkey = 0;
        const table =
            <div className="container">
                <div className="row justify-content-md-center">
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    <table {...getTableProps()} style={{
                        textAlign: 'center',
                    }}  >

                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>

                                    {headerGroup.headers.map(column => (
                                        <th
                                            key={uniqueListkey++}

                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            {...column.getHeaderProps()}>{column.render("Header")}<span
                                                style={{ position: 'relative', left: '4px', color: "red" }}
                                                role="img"

                                                aria-label="up and down arrows"
                                            >
                                                {column.isSorted ? (column.isSortedDesc ? ' ⇧⇩' : ' ⇩⇧') : ''}
                                            </span>
                                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()} style={{
                                                padding: '10px 35px',
                                                border: 'solid 1px gray',
                                            }}>{cell.render("Cell")}</td>;
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>;

        return table;
    }
    function GlobalFilter({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
    }) {
        const count = preGlobalFilteredRows.length
        const [value, setValue] = React.useState(globalFilter)
        const onChange = useAsyncDebounce(value => {
            setGlobalFilter(value || undefined)
        }, 200)

        return (
            <span>
                Search:{' '}
                <input
                    className="form-control"
                    value={value || ""}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                />
            </span>
        )
    }

    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length

        return (
            <input
                className="form-control"
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
                placeholder={`Search ${count} records...`}
            />
        )
    }

    function createAlternativeDisplay() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">;
                    <div>No assessments available.</div>
                </div>
            </div>
        );
    }
}