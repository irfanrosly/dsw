import React from "react"
export const GREETINGS = 'Good Morning';
export const FULLNAME = 'Hubert Blaine Wolfe­schlegel­stein­hausen­berger­dorff Sr.';
export const NOTIFICATION_COUNT = 6;
export const INITIAL_PATH = 'casa';
export const USERNAME = 'yang1234';
export const TAC_REQUEST_TIME = '26 Aug 2021 16:38:42 (+07 ICT Time)';
export const TAC_TITLE_INITIAL = 'Please confirm your transfer details.';
export const TAC_TITLE_FINAL = 'TAC has been requested.';

export const ACCOUNTS = [
  { label: 'Credit Card', value: 1 },
  { label: 'Debit Card', value: 2 },
  { label: 'Access Number', value: 3 },
];

export const ANIMALS = [
  {
    name: 'animal',
    value: 'cat',
    label: 'Cat',
  },
  {
    name: 'animal',
    value: 'dog',
    label: 'Dog',
  },
  {
    name: 'animal',
    value: 'fish',
    label: 'Fish',
  },
  {
    name: 'animal',
    value: 'snake',
    label: 'Snake',
  },
];

export const CARD = {
  title: 'Saving card',
  desc: 'lorem ipsum dolor sit amet,lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nulla blandit',
};

export const DEMO_MEDIA_CARD = {
  title: 'fixed deposit',
  desc: 'lorem ipsum dolor sit amet. Mauris quis nulla blandit',
};

export const INTERACTIVE_MEDIA_CARD = {
  title: 'maybank pro savings',
  desc: 'lorem ipsum dolor sit amet. Mauris quis nulla blandit. lorem ipsum dolor sit amet. Mauris quis nulla blandit.',
};

export const PANEL_CARDS = [
  {
    title: 'Monthly Installment',
    desc: 'Next Payment Due 5 Feb 2022',
    amount: 'IDR 457,000.00',
  },
  {
    title: 'Installment Amount Overdue',
    amount: 'IDR 0.00',
  },
];

export const ACTION_PANEL_CARD = {
  title: 'lorem ipsum',
  desc: '1234 5678 0000',
  amount: 'IDR 457,000.00',
};

export const CREDIT_CARD = {
  title: 'Maybank World MasterCard',
  desc: 'XXXX XXXX 1616',
  amount: 'IDR 457,000.00',
};

export const MENU_ITEMS = [
  { label: 'Pay Card', option: 'pay card' },
  { label: 'View Bill', option: 'view bill' },
];

export const TRANSFER_DETAILS = [
  { title: 'Account Number', info: '1234 5678 0000' },
  { title: 'Exchange Rate', info: 'IDR 123,456.00' },
  { title: 'Beneficiary Email', info: '' },
];

export const TRANSFER_ACCOUNTS = [
  { name: 'DIGI Reload', id: 'digi', value: 'digi', number: '016899123827' },
  { name: 'Indah Water', id: 'iw', value: 'iw', number: 'Indah Water' },
  { name: 'TNB', id: 'tnb', value: 'tnb', number: '1231239123019283' },
];

export const CASA_TRANSACTIONS = [
  {
    id: 1,
    currency: 'IDR',
    amount: '10000.0',
    description: 'Transfer dari Ahmad Dani',
    date: '3 Aug 2021',
  },
  {
    id: 2,
    currency: 'IDR',
    amount: '-68.0',
    description: '2107292242420588     XOLUAN0000000000078* PAYDIBS SDN BH',
    date: '29 Jul 2021',
  },
  {
    id: 3,
    currency: 'IDR',
    amount: '-50.0',
    description: '20000003170559     1122312312          * SHOPEE TOP UP',
    date: '12 Jun 2021',
  },
  {
    id: 4,
    currency: 'IDR',
    amount: '-100.0',
    description: 'TRF ke Mawa',
    date: '5 May 2021',
  },
  {
    id: 5,
    currency: 'IDR',
    amount: '-200.0',
    description: 'TRF ke  Aifaa',
    date: '12 Apr 2021',
  },
  {
    id: 6,
    currency: 'IDR',
    amount: '-100.0',
    description: 'TRF ke Ahmad Dani',
    date: '23 Mar 2021',
  },
];

export const INBOX_MESSAGE_COLUMNS = [
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'title', headerName: 'Title' },
];

export const INBOX_MESSAGES = [
  {
    id: 1,
    date: '6 May 2021',
    title: (
      <p>
        Important Notice
        <br />
        <br />
        Hi Vina, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam
      </p>
    ),
  },
  {
    id: 2,
    date: '13 Feb 2021',
    title: (
      <p>
        Important Notice
        <br />
        <br />
        Hi Vina, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam
      </p>
    ),
  },
  {
    id: 3,
    date: '1 Nov 2020',
    title: (
      <p>
        Important Notice
        <br />
        <br />
        Hi Vina, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam
      </p>
    ),
  },
];

export const PDF_URL = 'https://mbi-mock-api.herokuapp.com/static/pdf.json';

export const RECEIPT_FILENAME = '20210820_131515.pdf';

export const PHONES = [
  { value: 1, label: '******** 5678' },
  { value: 2, label: '******** 8900' },
];

export const MONTHS = [
  { value: 0, label: 'This month' },
  { value: 1, label: 'Last month' },
  { value: 2, label: 'Last 2 months' },
  { value: 3, label: 'Last 3 months' },
];

export const CREDIT_ACCOUNTS = [
  {
    value: '0',
    longName: 'Savings Account-i',
    displayNumber: '123129381209321',
    balance: 999.99,
    subType: '13',
    type: 'S',
    label: 'Savings Account-i',
    idx: '0',
    currency: 'RM',
  },
  {
    value: '1',
    longName: 'Visa Ikhwan Gold',
    displayNumber: 'xxxx-xxxx-xxxx-1111',
    balance: '',
    subType: '3G',
    type: 'C',
    label: 'Visa Ikhwan Gold',
    idx: '1',
    currency: 'RM',
  },
  {
    value: '2',
    longName: 'Maybankard 2 Visa Gold',
    displayNumber: 'xxxx-xxxx-xxxx-2222',
    balance: '',
    subType: '4B',
    type: 'C',
    label: 'Maybankard 2 Visa Gold',
    idx: '2',
    currency: 'RM',
  },
  {
    value: '3',
    longName: 'Maybankard 2 Amex Gold',
    displayNumber: 'xxx-xxxx-xxxx-4444',
    balance: '',
    subType: '4A',
    type: 'C',
    label: 'Maybankard 2 Amex Gold',
    idx: '3',
    currency: 'RM',
  },
];

export const DASHBOARD_LINKS = [
  {
    value: 'casa',
    type: 'CASA',
    label: 'ACCOUNT',
    currencyCodeIso: 'IDR',
    balance: '50000000',
    balanceDisplay: 'IDR 50,000,000.00',
    labelClass: 'green',
  },
  {
    value: 'td',
    type: 'TD',
    label: 'TIME DEPOSIT',
    currencyCodeIso: 'IDR',
    balance: '150000000',
    balanceDisplay: 'IDR 150,000,000.00',
    labelClass: 'green',
  },
  {
    value: 'cc',
    type: 'CC',
    label: 'CREDIT CARD',
    currencyCodeIso: 'IDR',
    balance: '35000000',
    balanceDisplay: 'IDR 35,000,000.00',
    labelClass: 'red',
  },
  {
    value: 'loan',
    type: 'LOAN',
    label: 'LOAN',
    currencyCodeIso: 'IDR',
    balance: '15000000',
    balanceDisplay: 'IDR 15,000,000.00',
    labelClass: 'red',
  },
  {
    value: 'wealth',
    type: 'WEALTH',
    label: 'WEALTH',
    currencyCodeIso: 'IDR',
    balance: '80000000',
    balanceDisplay: 'IDR 80,000,000.00',
    labelClass: 'green',
  },
];

export const ACCOUNT_BALANCES = {
  CASA: [
    {
      type: 'CASA',
      currencyCodeIso: 'IDR',
      balance: '20000000',
      balanceDisplay: 'IDR 20,000,000.00',
    },
    {
      type: 'CASA',
      currencyCodeIso: 'USD',
      balance: '2000',
      balanceDisplay: 'USD 2,000.00',
    },
  ],
  TD: [
    {
      type: 'TD',
      currencyCodeIso: 'IDR',
      balance: '150000000',
      balanceDisplay: 'IDR 150,000,000.00',
    },
  ],
  LOAN: [
    {
      type: 'LOAN',
      currencyCodeIso: 'IDR',
      balance: '15000000',
      balanceDisplay: 'IDR 15,000,000.00',
    },
  ],
  CC: [
    {
      type: 'CC',
      currencyCodeIso: 'IDR',
      balance: '35000000',
      balanceDisplay: 'IDR 35,000,000.00',
    },
  ],
  WEALTH: [
    {
      type: 'WEALTH',
      currencyCodeIso: 'IDR',
      balance: '80000000',
      balanceDisplay: 'IDR 80,000,000.00',
    },
  ],
};

// Note that this is a Date object, January is 0, Dec = 11
export const PUBLIC_HOLIDAYS = [new Date(2021, 11, 22), new Date(2022, 0, 19)];

export const INVESTMENT_CURRENT_YEAR = 2022;
export const INVESTMENT_TARGET_YEAR = 2027;
export const INVESTMENT_DATA = [
  {
    y: '126360.26',
    x: '2022',
  },
  {
    y: '302134.62',
    x: '2023',
  },
  {
    y: '502726.91',
    x: '2024',
  },
  {
    y: '731641.22',
    x: '2025',
  },
  {
    y: '992876.4',
    x: '2026',
  },
  {
    y: '1290995.88',
    x: '2027',
  },
];

export const RETIREMENT_CURRENT_AGE = 37;
export const RETIREMENT_TARGET_AGE = 60;
export const RETIREMENT_LAST_AGE = 75;
export const RETIREMENT_DATA_PREVIOUS = [
  {
    y: '0',
    x: '37',
  },
  {
    y: '133737.85',
    x: '40.8',
  },
  {
    y: '272331.94',
    x: '44.6',
  },
  {
    y: '448382.96',
    x: '48.4',
  },
  {
    y: '672014.13',
    x: '52.2',
  },
  {
    y: '956084.63',
    x: '56',
  },
  {
    y: '1316929.01',
    x: '59.8',
  },
  {
    y: '1338417.96',
    x: '60',
  },
  {
    y: '1584684.47',
    x: '67.4',
  },
  {
    y: '1763406.83',
    x: '71.2',
  },
  {
    y: '1990431.31',
    x: '75',
  },
];

export const RETIREMENT_DATA_CURRENT = [
  {
    y: '0',
    x: '37',
  },
  {
    y: '113369.73',
    x: '40.8',
  },
  {
    y: '194887.49',
    x: '44.6',
  },
  {
    y: '269772.08',
    x: '48.4',
  },
  {
    y: '338563.26',
    x: '52.2',
  },
  {
    y: '401756.85',
    x: '56',
  },
  {
    y: '459808.33',
    x: '59.8',
  },
  {
    y: '462729.32',
    x: '60',
  },
  {
    y: '-21600',
    x: '67.4',
  },
  {
    y: '-240885.14',
    x: ' 71.2',
  },
  {
    y: '-442326.89',
    x: '75',
  },
];

export const DOUGHNUT_CHART_DATA = {
  datasets: [
    {
      data: [40.34, 60.32],
      backgroundColor: ['#FFB300', '#005FAC'],
    },
  ],
};

// TODO: USED FOR FAV ACCOUNTS. REMOVE LATER WHEN REDUX STATE CREATED
export const FAV_LIST = [
  {
    index: 0,
    transferType: 2,
    accountNumber: '1003354896',
    accountType: 'S',
    transferDesc: 'Within Maybank',
    beneficiary: 'Test Fav Within BII',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: 'Maybank',
  },
  {
    index: 1,
    transferType: 2,
    accountNumber: '1003668478',
    accountType: 'S',
    transferDesc: 'Within Maybank',
    beneficiary: 'tes fav within bii',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: 'Maybank',
  },
  {
    index: 2,
    transferType: 2,
    accountNumber: '2001000014',
    accountType: 'D',
    transferDesc: 'Within Maybank',
    beneficiary: 'pt testing',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: 'Maybank',
  },
  {
    index: 3,
    transferType: 2,
    accountNumber: '2003000011',
    accountType: 'D',
    transferDesc: 'Within Maybank',
    beneficiary: 'pt abc',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: 'Maybank',
  },
  {
    index: 4,
    transferType: 2,
    accountNumber: '2003194325',
    accountType: 'D',
    transferDesc: 'Within Maybank',
    beneficiary: 'tes trf diatas 25000',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: 'Maybank',
  },
  {
    index: 5,
    transferType: 2,
    accountNumber: '8700027000',
    accountType: 'D',
    transferDesc: 'Within Maybank',
    beneficiary: 'aditya',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: 'Maybank',
  },
  {
    index: 6,
    transferType: 3,
    accountNumber: '1250099774444',
    accountType: null,
    transferDesc: 'Interbank',
    beneficiary: 'Testing Mandiri Account',
    beneficiaryEmail: null,
    bankCodePayeeCode: '000008',
    bankName: 'Bank Mandiri',
  },
  {
    index: 7,
    transferType: 3,
    accountNumber: '11223344',
    accountType: null,
    transferDesc: 'Interbank',
    beneficiary: 'permata satu',
    beneficiaryEmail: null,
    bankCodePayeeCode: '000013',
    bankName: 'Bank Permata',
  },
  {
    index: 8,
    transferType: 3,
    accountNumber: '1122334455',
    accountType: null,
    transferDesc: 'Interbank',
    beneficiary: 'Permata dua',
    beneficiaryEmail: null,
    bankCodePayeeCode: '000013',
    bankName: 'Bank Permata',
  },
  {
    index: 9,
    transferType: 3,
    accountNumber: '7888000334',
    accountType: null,
    transferDesc: 'Interbank',
    beneficiary: 'INTI',
    beneficiaryEmail: null,
    bankCodePayeeCode: '000014',
    bankName: 'Bank Central Asia',
  },
  {
    index: 10,
    transferType: 3,
    accountNumber: '876543219',
    accountType: null,
    transferDesc: 'Interbank',
    beneficiary: 'test',
    beneficiaryEmail: null,
    bankCodePayeeCode: '000014',
    bankName: 'Bank Central Asia',
  },
  {
    index: 11,
    transferType: 3,
    accountNumber: '8888880001',
    accountType: null,
    transferDesc: 'Interbank',
    beneficiary: 'bca realtime',
    beneficiaryEmail: null,
    bankCodePayeeCode: '000014',
    bankName: 'Bank Central Asia',
  },
  {
    index: 12,
    transferType: 3,
    accountNumber: '987654321',
    accountType: null,
    transferDesc: 'Interbank',
    beneficiary: 'test BCA baru',
    beneficiaryEmail: null,
    bankCodePayeeCode: '000014',
    bankName: 'Bank Central Asia',
  },
  {
    index: 13,
    transferType: 3,
    accountNumber: '0987654321',
    accountType: null,
    transferDesc: 'Interbank',
    beneficiary: 'Bank Maluku realtime',
    beneficiaryEmail: null,
    bankCodePayeeCode: '000131',
    bankName: 'Bank Maluku',
  },
  {
    index: 14,
    transferType: 4,
    accountNumber: '1234567890123',
    accountType: null,
    transferDesc: 'E-Money',
    beneficiary: 'iSakuOpen',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 15,
    transferType: 4,
    accountNumber: '222222222222',
    accountType: null,
    transferDesc: 'E-Money',
    beneficiary: 'iSakuClosed',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 16,
    transferType: 4,
    accountNumber: '111111111',
    accountType: null,
    transferDesc: 'E-Money',
    beneficiary: 'DOKU Wallet',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 17,
    transferType: 4,
    accountNumber: '12324444444',
    accountType: null,
    transferDesc: 'E-Money',
    beneficiary: 'DOKU Wallet',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 18,
    transferType: 6,
    accountNumber: '223344111',
    accountType: null,
    transferDesc: 'Transfer RTGS',
    beneficiary: 'aditya super new rtgs',
    beneficiaryEmail: null,
    bankCodePayeeCode: '0110042',
    bankName: 'DANAMON PUSAT, JKT',
  },
  {
    index: 19,
    transferType: 5,
    accountNumber: '1234567890',
    accountType: null,
    transferDesc: 'Transfer SKN',
    beneficiary: 'Test ESB Holiday Table SKN',
    beneficiaryEmail: null,
    bankCodePayeeCode: '0140012',
    bankName: 'BCA PUSAT, JKT',
  },
  {
    index: 20,
    transferType: 7,
    accountNumber: '7821081292955021',
    accountType: null,
    transferDesc: 'Virtual Account',
    beneficiary: 'VA Test',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 21,
    transferType: 7,
    accountNumber: '78243000306',
    accountType: null,
    transferDesc: 'Virtual Account',
    beneficiary: 'test',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 22,
    transferType: 7,
    accountNumber: '78243000307',
    accountType: null,
    transferDesc: 'Virtual Account',
    beneficiary: 'va sebelas digit',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 23,
    transferType: 7,
    accountNumber: '78243000308',
    accountType: null,
    transferDesc: 'Virtual Account',
    beneficiary: 'Batari ALEXANDRIN',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 24,
    transferType: 7,
    accountNumber: '7881800100004122',
    accountType: null,
    transferDesc: 'Virtual Account',
    beneficiary: 'va closed amount',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 25,
    transferType: 7,
    accountNumber: '7881800100004140',
    accountType: null,
    transferDesc: 'Virtual Account',
    beneficiary: 'VA TEST BARU Close',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 26,
    transferType: 7,
    accountNumber: '78900123456789',
    accountType: null,
    transferDesc: 'Virtual Account',
    beneficiary: 'WOM Finance Abang adek',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 27,
    transferType: 7,
    accountNumber: '7890012345678902',
    accountType: null,
    transferDesc: 'Virtual Account',
    beneficiary: 'VA Test Open',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 28,
    transferType: 8,
    accountNumber: '987654321',
    accountType: null,
    transferDesc: 'Foreign Currency',
    beneficiary: 'nama penerima satu',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 29,
    transferType: 8,
    accountNumber: '12312312312',
    accountType: null,
    transferDesc: 'Foreign Currency',
    beneficiary: 'aditya',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 30,
    transferType: 8,
    accountNumber: '123123',
    accountType: null,
    transferDesc: 'Foreign Currency',
    beneficiary: 'asd',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
  {
    index: 31,
    transferType: 8,
    accountNumber: '123456789',
    accountType: null,
    transferDesc: 'Foreign Currency',
    beneficiary: 'nama',
    beneficiaryEmail: null,
    bankCodePayeeCode: null,
    bankName: null,
  },
];
