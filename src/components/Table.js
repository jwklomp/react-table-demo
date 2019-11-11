import React from 'react'
import { useTable, useFilters, useSortBy, usePagination } from 'react-table'
import DefaultColumnFilter from './DefaultColumnFilter'
import { fuzzyTextFilterFn } from '../utils/filterUtils'
import Pagination from './Pagination'

// Our table component
const Table = ({ columns, data }) => {
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        prepareRow,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useSortBy,
        usePagination
    )

    return (
        <>
            <div>
                <pre>
                    <code>{JSON.stringify(
                        pageIndex,
                        pageSize,
                        pageCount,
                        canNextPage,
                        canPreviousPage)}
                    </code>
                </pre>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ' '}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
            <Pagination previousPage={previousPage} nextPage={nextPage} pageCount={pageCount} canNextPage={canNextPage} pageIndex={pageIndex} pageOptions={pageOptions} gotoPage={gotoPage} pageSize={pageSize} setPageSize={setPageSize} canPreviousPage={canPreviousPage} />




        </>
    )
}

export default Table