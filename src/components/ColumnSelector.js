import React from 'react'

const ColumnSelector = ({ columnDefinition, setColumnDefinition }) => {

    const adaptShowField = (headerToFind, value, colDef) => colDef.reduce((acc, field) => {
        if (field.hasOwnProperty('columns')) {
            adaptShowField(headerToFind, value, field.columns)
        }
        if (field.hasOwnProperty('Header') && field.Header === headerToFind) {
            field.show = value
        }
        return acc.concat(field)
    }, [])

    const adaptOrder = (headerToFind, value, colDef) => colDef.reduce((acc, field) => {
        if (field.hasOwnProperty('columns')) {
            adaptOrder(headerToFind, value, field.columns)
            field.columns.sort((a, b) => (a.order > b.order) ? 1 : -1)
        }
        if (field.hasOwnProperty('Header') && field.hasOwnProperty('order') && field.Header === headerToFind) {
            field.order = value
        }
        return acc.concat(field)
    }, [])

    const handleShowChange = (Header, event) => 
        setColumnDefinition(adaptShowField(Header, event.target.checked, columnDefinition))

    const handleOrderChange = (Header, event) => 
        setColumnDefinition(adaptOrder(Header, event.target.value, columnDefinition))    

    const makeField = field => {
        return (
            <tr key={field.Header}>
                <td>{field.Header}</td>
                <td><input
                    name="show"
                    type="checkbox"
                    checked={field.show}
                    onChange={e => handleShowChange(field.Header, e)} /></td>
                {field.order ?
                    <td>
                        <input
                            name="show"
                            type="number"
                            value={field.order}
                            onChange={e => handleOrderChange(field.Header, e)} />
                    </td> :
                    <td></td>}
            </tr>
        )
    }

    const makeColumn = col => {
        return col.hasOwnProperty('columns') ? (
            <>
                {makeField(col)}
                {col.columns.map(c => makeColumn(c))}
            </>
        )
            : makeField(col)
    }

    return (
        <table><tbody>{columnDefinition.filter(field => field.hasOwnProperty('Header')).map(col => makeColumn(col))}</tbody></table>
    )

}

export default ColumnSelector