import React, { useState, useEffect } from 'react';
import { AssessmentService } from '../shared/services/assessment.service';
import { useTable, useSortBy,usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

export function AssessmentList() {

    const [columnsArray, setColumnsArray] = useState([]);

    useEffect(function fetch() {
        (async function() {
            updateAssessmentState();
        })();
    },[]);
   
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
                {
                    Header:'Delete a row',
                    accessor: 'column8',
                    Filter: DefaultColumnFilter,
                    disableSortBy: true,
                    headerClassName: 'visible'
                }
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
            setGlobalFilter, 
            page,state,
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            state: { pageIndex, pageSize },

            prepareRow
        } = useTable({
            columns,
            data, disableSortBy: false,
            defaultColumn, 
            initialState: { pageIndex:0, pageSize:5},
            
        },
        
        useFilters,
            useGlobalFilter, useSortBy,usePagination);
            
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
                        {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()} style={{
                                                padding: '10px 35px',
                                                border: 'solid 1px gray',
                                            }}>{cell.render("Cell")} 
                                           </td>;
                                           
                                        })}
                                    </tr>
                                    
                                    
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="pagination">
                    <ul className="pagination">
                <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="page-link">First</a>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="page-link">{'<'}</a>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="page-link">{'>'}</a>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="page-link">Last</a>
                </li>
                <li>
                    <a className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </a>
                </li>
                <li>
                    <a className="page-link">
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={pageIndex+1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : count
                                gotoPage(page)
                            }}
                            style={{ width: '100px', height: '20px' }}
                        />
                    </a>
                </li>{' '}
                <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </ul>
      </div>
                  
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
            <span style={{ width: '250px', fontFamily:'lato regular', fontSize:'larger', paddingBottom:'70px' }}>
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
    async function  deleteAssessment(id){   
   
 
        await AssessmentService.deleteAssessment(id).then(()=>{
            alert("Row is successfully deleted")
            updateAssessmentState();
        });

    }

    async function updateAssessmentState(){
        const resData = await AssessmentService.retrieveAll();
            const columnedData = []
            resData.data.forEach(assessment => {

                let dateOfBirth = Date.parse(assessment.cat_date_of_birth);
                dateOfBirth = new Date (dateOfBirth);
                dateOfBirth = dateOfBirth.toLocaleDateString("en-US");

                let createdAt = Date.parse(assessment.created_at);
                createdAt = new Date (createdAt);
                createdAt = createdAt.toLocaleString("en-US");
              
                let btnDelete = 
                <button 
                    type="button"
                    className="btn btn-danger"
                    id ={assessment.id}
                    onClick={deleteAssessment.bind(this, assessment.id)}
                    >Delete</button>
                
                    
                columnedData.push(
                    {
                        column1: assessment.id,
                        column2: assessment.cat_name,
                        column3: dateOfBirth,
                        column4: assessment.instrument,
                        column5: assessment.risk_level,
                        column6: assessment.score+'',
                        column7: createdAt,
                        column8: btnDelete,
                    })
            });
            setColumnsArray(columnedData);
    }
    }