import React, { Children, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { get } from '../utils/lodash'

import { ALIGN_INHERIT } from '../utils/settings/constants/ui-control'

import { Checkbox } from '../checkbox/Checkbox'
import { Pagination } from '../pagination/Pagination'

const INDEX_NOT_FOUND = -1
const FIRST_PAGE = 1

export const Table = ({
  rows,
  size,
  label,
  columns,
  hasRows,
  onChange,
  pageSize,
  className,
  hasCheckbox,
  hasPagination,
  emptyRowContent,
  ActionComponent
}) => {
  const [checkedRows, setCheckedRows] = useState([]) // for checkbox
  const [page, setPage] = useState(FIRST_PAGE) // default page is first page

  // check or uncheck ALL boxes
  const handleCheckAll = (event) => {
    const isChecked = event.target.checked
    const checkedItems = isChecked
      ? rows.map((row, index) => get(row, 'id', index))
      : []

    setCheckedRows(checkedItems)
    onChange(checkedItems) // pass back ALL checkedRows [id] or none
  }

  // check on uncheck a particular box
  const handleCheck = (event, id) => {
    const isChecked = event.target.checked

    const checkedItems = isChecked
      ? checkedRows.concat(id)
      : checkedRows.filter((item) => item !== id) // if uncheck, remove the checkedRows id

    setCheckedRows(checkedItems)
    onChange(checkedItems) // pass back checkedRows [id] to application
  }

  const handlePageChange = (event, newPage) => setPage(newPage)

  const isItemChecked = (id) => checkedRows.indexOf(id) !== INDEX_NOT_FOUND

  const rowCount = rows.length

  const isCheckedAll = checkedRows.length === rowCount

  const currentPageIndex = page - 1 // -1 because index starts at 0 while page starts at 1
  const startRowIndex = currentPageIndex * pageSize
  const endRowIndex = currentPageIndex * pageSize + pageSize
  // update which row to show based on current page
  const updatedRows = hasPagination
    ? rows.slice(startRowIndex, endRowIndex)
    : rows

  // Round up for number of pages
  const pageCount = Math.ceil(rowCount / pageSize)

  const columnSpan = columns.length

  // received new data reset to first page
  useEffect(() => {
    setPage(FIRST_PAGE)
  }, [rows])

  return (
    <TableContainer className={`common table ${className}`}>
      <MaterialTable aria-label={label} size={size}>
        <TableHead>
          <TableRow>
            {hasCheckbox && (
              <TableCell padding='checkbox'>
                <Checkbox
                  variant='round'
                  isChecked={isCheckedAll}
                  onChange={(value) => handleCheckAll(value)}
                />
              </TableCell>
            )}
            {Children.toArray(
              columns.map((column) => {
                const width = get(column, 'width', null)
                // default align attribute is inherit
                const textAlign = get(column, 'align', ALIGN_INHERIT)

                return (
                  <TableCell
                    className='ttu'
                    align={textAlign}
                    style={{ width }}
                  >
                    {column.headerName}
                  </TableCell>
                )
              })
            )}
            {ActionComponent && <TableCell className='ttu' />}
          </TableRow>
        </TableHead>
        <TableBody>
          {hasRows ? (
            Children.toArray(
              updatedRows.map((row, index) => {
                const id = get(row, 'id', index)
                const isChecked = isItemChecked(id)

                return (
                  <TableRow>
                    {hasCheckbox && (
                      <TableCell padding='checkbox'>
                        <Checkbox
                          variant='round'
                          isChecked={isChecked}
                          onChange={(event) => handleCheck(event, id)}
                        />
                      </TableCell>
                    )}

                    {Children.toArray(
                      columns.map((column) => {
                        const field = get(column, 'field', '')
                        // default align attribute is inherit
                        const textAlign = get(column, 'align', ALIGN_INHERIT)

                        return (
                          <TableCell align={textAlign}>{row[field]}</TableCell>
                        )
                      })
                    )}
                    {ActionComponent && (
                      <TableCell>
                        <ActionComponent {...row} />
                      </TableCell>
                    )}
                  </TableRow>
                )
              })
            )
          ) : (
            <TableRow>
              <TableCell align='center' colSpan={columnSpan}>
                {emptyRowContent}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MaterialTable>

      {hasPagination && (
        <Pagination
          className='mt3'
          page={page}
          count={pageCount}
          onChange={handlePageChange}
        />
      )}
    </TableContainer>
  )
}

Table.defaultProps = {
  className: '',
  emptyRowContent: '',
  hasCheckbox: false,
  hasPagination: false,
  hasRows: true,
  label: 'simple table',
  pageSize: 1,
  size: 'small',
  onChange: null,
  rows: [],
  ActionComponent: null
}

Table.propTypes = {
  className: PropTypes.string,
  hasCheckbox: PropTypes.bool,
  hasPagination: PropTypes.bool,
  hasRows: PropTypes.bool,
  emptyRowContent: PropTypes.node,
  label: PropTypes.string,
  onChange: PropTypes.func,
  pageSize: PropTypes.number, // num of rows to display per page (for pagination)
  rows: PropTypes.array, // rows item must have an id property
  columns: PropTypes.array.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  ActionComponent: PropTypes.node
}

