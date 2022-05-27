import { gbi } from './gbi';

export const digitalWealth = {
  gbi,
  menu: {
    portfolio: 'My Portfolio',
    assets: 'My Assets {totalAsset}',
    loans: 'My Borrowing {totalBorrowing}',
    financialGoal: 'My Financial Goals',
    assetCaption: 'Deposit | Savings | Bonds | Mutual Fund | Bancassurance',
    loanCaption: 'Credit Card | Mortgage & Other Loans',
    noAsset: "Don't Have Assets Account",
    noLoan: "Don't Have Borrowing Account",
  },
  portfolio: {
    equivalent: 'Equivalent {equivalentAmount}',
    noLoan: 'You do not have any Loan with us.',
    noAsset: 'You do not have any Asset with us',
    noHolding: 'You do not have any Asset or Loan with us.',
    loanLink:
      'Apply our Loan Product on M2U Mobile App, or visit <a href="https://www.maybank.co.id/" target="_blank" rel="noreferrer">www.maybank.co.id</a> to learn more about our products and services.',
    assetLink:
      'Apply our Asset Product on M2U Mobile App, or visit <a href="https://www.maybank.co.id/" target="_blank" rel="noreferrer">www.maybank.co.id</a> to learn more about our products and services.',
    portfolioLink:
      'Apply our Asset Product or Loan Product on M2U Mobile App, or visit <a href="https://www.maybank.co.id/" target="_blank" rel="noreferrer">www.maybank.co.id</a> to learn more about our products and services.',
    forexDisclaimer:
      'The exchange rates that used to calculate your assets in currency other than rupiah is indicative and subject to change wihtout prior notification',
    appStore: 'Download on the App Store',
    playStore: 'Get it on Google Play',
  },
  goalCard: {
    title: 'Have you set your financial goals for your future?',
    description: "Want to see if you have enough for your retirement or children's education? Find out more here.",
  },
  goalTab: {
    title: 'Simulate Your Financial Goal',
    description: 'Simulate your financial goals and make your dreams come true',
    totalInvestment: 'Total investment to be achieved',
    currentInvestment: 'Total current investment',
    goalEnd: 'Goal ends at',
    products: '{totalProduct} Investment Products',
    close: 'Close',
    viewAll: 'View All Investment Products',
  },
  goalDetail: {
    initialAmount: 'Initial Investment Amount',
    totalMonthly: 'Total Monthly Investment IDR',
    sourceFund: 'Source of fund',
    monthlyDebit: 'Monthly Debit <br/>Date {date}',
    goalEnd: 'Goal ends at {date}',
    autoDebit: 'Auto debit date {date}',
  },
};
