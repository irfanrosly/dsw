import React,{ useReducer } from 'react'
import '../styles.scss'
import { PDFViewer,Select,ActionButton } from 'dyno-shared-web'
import { ICONS } from '../utils/icons'
const PDF_URL = 'https://mbi-mock-api.herokuapp.com/static/pdf.json';
const RECEIPT_FILENAME = '20210820_131515.pdf';
export const MONTHS = [
    { value: 0, label: 'This month' },
    { value: 1, label: 'Last month' },
    { value: 2, label: 'Last 2 months' },
    { value: 3, label: 'Last 3 months' },
  ];

export const PDFScreen = () =>{
    const [state, setState] = useReducer((prevState, newState) => ({ ...prevState, ...newState }), {
        isPDFOpen: {
          first: false,
          second: false,
        },
        pdfContent: {
          first: '',
          second: '',
        },
        currentMonth: MONTHS[0].value,
      });
    
      const { isPDFOpen, pdfContent, currentMonth } = state;
      const isOpenFirst = isPDFOpen.first;
      const isOpenSecond = isPDFOpen.second;
      const contentFirst = pdfContent.first;
      const contentSecond = pdfContent.second;
    
      const togglePDF = (name, value) => setState({ isPDFOpen: { ...isPDFOpen, [name]: !value } });
    
      // For demo purpose only. Actual PDF is fetched from Dashboard API using middleware
      const fetchPDF = name => {
        togglePDF(name, isPDFOpen[name]);
        fetch(PDF_URL)
          .then(res => res.json())
          .then(result => {
            setState({ pdfContent: { ...pdfContent, [name]: `data:application/pdf;base64,${result.receiptPdf}` } }); // append MIME type
          });
      };
    
      const handleMonthSelect = event => setState({ currentMonth: event.target.value });
    
      return (
        <>
          <h1>Demo for PDFViewer</h1>
          <div className="mt3">
            <h2>Simple PDFViewer</h2>
            <ActionButton
              isAssetIcon={false}
              onClick={() => fetchPDF('first')}
              title="view receipt"
              icon={ICONS.get('download')}
              className="transparent-bb db"
            />
            <PDFViewer
              filename={RECEIPT_FILENAME}
              isOpen={isOpenFirst}
              onClose={() => togglePDF('first', isOpenFirst)}
              content={contentFirst}
            />
          </div>
    
          <div className="mt5">
            <h2>PDFViewer with month selection</h2>
            <ActionButton
              isAssetIcon={false}
              onClick={() => fetchPDF('second')}
              title="view statement"
              icon={ICONS.get('download')}
              className="transparent-bb db"
            />
            <PDFViewer
              hasDropdown
              filename={RECEIPT_FILENAME}
              isOpen={isOpenSecond}
              onClose={() => togglePDF('second', isOpenSecond)}
              content={contentSecond}
              dropdown={<Select value={currentMonth} options={MONTHS} name="statement" onChange={handleMonthSelect} className="select-light" />}
            />
          </div>
        </>
      );
}