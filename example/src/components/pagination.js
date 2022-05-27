import React, { useState } from 'react'
import {Pagination} from 'dyno-shared-web'
import '../../src/styles.css'
import 'dyno-shared-web/dist/index.css'

// mock pages for demo, to illustrate page change
const PAGES = [
  { date: '22/7/2021', description: 'Bill Payment', amount: 'MYR 99' },
  { date: '1/6/2021', description: 'Shopee', amount: 'MYR 1,200' },
  { date: '31/5/2021', description: 'Instant Transfer', amount: 'MYR 176' },
  { date: '4/4/2021', description: 'Shopee', amount: 'MYR 999' },
  { date: '27/3/2021', description: 'Prepaid Reload', amount: 'MYR 30' },
  { date: '6/2/2021', description: 'Prepaid Reload', amount: 'MYR 50' },
  { date: '12/1/2021', description: 'Instant Transfer', amount: 'MYR 100' },
  { date: '25/12/2020', description: 'XMAS Gift', amount: 'MYR 240' },
];

const PaginationScreen = () => {
  const [currentPage, setPage] = useState(1);

  const { date, description, amount } = PAGES[currentPage - 1];

  const handleChange = (event, value) => setPage(value);

  return (
    <>
      <h1>Demo for Pagination</h1>

      <p className="mb5">
        <i>NOTE: This component only provides the UI for pagination. The logic is handled by application (as shown in this demo)</i>
      </p>

      <div className="w-80">
        <table className="collapse ba br2 b--black-10 pv2 ph3 mt3 w-100">
          <tbody>
            <tr className="striped--near-white ">
              <th className="tl pv2 ph3 f6 fw6 ttu">Date</th>
              <th className="tl f6 ttu fw6 pv2 ph3">Description</th>
              <th className="tl f6 ttu fw6 pv2 ph3">Amount</th>
            </tr>

            <tr className="striped--near-white ">
              <td className="pv2 ph3">{date}</td>
              <td className="pv2 ph3">{description}</td>
              <td className="pv2 ph3">{amount}</td>
            </tr>
          </tbody>
        </table>

        <Pagination className="mv3" page={currentPage} count={PAGES.length} onChange={handleChange} />
      </div>
    </>
  );
};

export default PaginationScreen;