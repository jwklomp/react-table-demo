import React from 'react'

const ColumnSelector = ({ columnDefinition, setColumnDefinition }) => {

    const adaptHeader = (headerToFind, value, colDef) => colDef.reduce((acc, field) => {
        if (field.hasOwnProperty('columns') ) {
            adaptHeader(headerToFind, value, field.columns)
        }
        if (field.hasOwnProperty('Header') && field.Header === headerToFind) {
            field.show = value
        } 
        return acc.concat(field) 
    }, [])

    const handleChange = (Header, event) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setColumnDefinition(adaptHeader(Header, value, columnDefinition))
      }


    const makeField = field => {
        return (
            <tr key={field.Header}>
                <td>{field.Header}</td>
                <td><input
                    name="show"
                    type="checkbox"
                    checked={field.show}
                    onChange={e => handleChange(field.Header, e)} /></td>
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