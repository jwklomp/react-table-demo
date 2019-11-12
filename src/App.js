import React, {useState} from 'react'
import styled from 'styled-components'
import SelectColumnFilter from './components/SelectColumnFilter'
import SliderColumnFilter from './components/SliderColumnFilter'
import ColumnSelector from './components/ColumnSelector'
import NumberRangeColumnFilter from './components/NumberRangeColumnFilter'
import Table from './components/Table'
import { filterGreaterThan } from './utils/filterUtils'
import makeData from './utils/makeData'

const initialColumnDefinition = [
  {
    Header: 'Name',
    show: true,
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName',
        show: true,
        order: 1
      },
      {
        Header: 'Last Name',
        show: true,
        order: 2,
        accessor: 'lastName',
        // Use our custom `fuzzyText` filter on this column
        filter: 'fuzzyText',
      },
    ],
  },
  {
    Header: 'Info',
    show: true,
    columns: [
      {
        Header: 'Age',
        accessor: 'age',
        show: true,
        order: 3,
        Filter: SliderColumnFilter,
        filter: 'equals',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        show: true,
        order: 4,
        Filter: NumberRangeColumnFilter,
        filter: 'between',
      },
      {
        Header: 'Status',
        accessor: 'status',
        show: true,
        order: 5,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        show: true,
        order: 6,
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
      },
    ],
  },
]

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        background: grey;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          background: red;
        }
      }

    }
  }
  
  .pagination {
    padding: 0.5rem;
  }
`

function App() {

  const [columnDefinition, setColumnDefinition] = useState(initialColumnDefinition);

  const columns = React.useMemo(
    () => columnDefinition,
    [columnDefinition]
  )

  const data = React.useMemo(() => makeData(10000), [])

  return (
    <Styles>
      <>
        <h1>Demo of React Table</h1>
        <h3>Select and order fields</h3>
        <ColumnSelector columnDefinition={columnDefinition} setColumnDefinition = {setColumnDefinition} />
        <h3>Data</h3>
        <Table columns={columns} data={data} />
      </>
    </Styles>
  )
}

export default App
