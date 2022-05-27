import React, { useState, useEffect } from 'react'
import '../styles.scss'
import { Table, ActionButton } from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'
import {
  CASA_TRANSACTIONS,
  INBOX_MESSAGES,
  INBOX_MESSAGE_COLUMNS
} from '../settings/constants/demo'

const CASA_TRANSACTION_COLUMNS = [
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'description', headerName: 'Description' },
  { field: 'amount', headerName: 'Amount' }
]
export const TableScreen = () => {
  const [toDelete, setToDelete] = useState([])
  const handleChange = (selected) => setToDelete(selected)

  return (
    <div
      style={{
        marginTop:"1rem",
        backgroundColor: 'white',
        border: '1px solid darkgrey',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-evenly',
        padding:".5rem",
      }}
    >
      <h1>Demo for table</h1>
      <h2>Simple Table, with no rows data</h2>
      <div className=''>
        <Table
          className='w-80'
          hasRows={false}
          columns={CASA_TRANSACTION_COLUMNS}
          emptyRowContent='No transaction data'
        />
      </div>

      <h2>Table with Checkbox</h2>
      <div className=''>
        <Table
          hasCheckbox
          className='w-80'
          columns={INBOX_MESSAGE_COLUMNS}
          rows={INBOX_MESSAGES}
          pageSize={4}
          onChange={handleChange}
        />
      </div>

      <h2>Table with Pagination</h2>
      <div className=''>
        <Table
          className='w-80'
          columns={CASA_TRANSACTION_COLUMNS}
          rows={CASA_TRANSACTIONS}
          pageSize={3}
          hasPagination
        />
      </div>
    </div>
  )
}
