import React,{ Children, useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';

import {Backdrop,Grid} from '@mui/material';
import { IconButton } from '../Button/IconButton';
import {Icon} from '../Icon';
import loadingImg from 'loading.gif';
import Download from '@mui/icons-material/SystemUpdateAlt';
import Close from '@mui/icons-material/Close';
import ZoomIn from 'zoom-in.svg';
import ZoomOut from 'zoom-out.svg';

const PAGE_MARGIN = 100;
const INITIAL_PAGE_WIDTH = window.innerWidth - PAGE_MARGIN;
const INITIAL_PAGE_SCALE = 0.6; // 60% Zoom
const PAGE_SCALE_FACTOR = 0.2;
const PDF_PREFIX = 'data:application/pdf;base64';
const INDEX_NOT_FOUND = -1;

const PDFLoadingMessage = () => <img src={loadingImg} alt="Loading PDF..." />;

// we need to declare pdfWorker explicitly
//Original code not working 
// pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/scripts/pdf.worker.js`;

//new added
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const PDFViewer = ({ className, content, filename, hasDropdown, dropdown, isOpen, onClose }) => {
  const [pages, setPages] = useState([]);
  const [pageScale, setPageScale] = useState(INITIAL_PAGE_SCALE);

  // numPages is a props returned by react-pdf's onLoadSuccess function
  const onDocumentLoadSuccess = ({ numPages }) => setPages(new Array(numPages).fill('')); // init an array with size = numPages

  const zoomIn = () => setPageScale(pageScale + PAGE_SCALE_FACTOR);

  const zoomOut = () => setPageScale(pageScale - PAGE_SCALE_FACTOR);

  if (content && content.indexOf(PDF_PREFIX) === INDEX_NOT_FOUND) {
    // check if content is valid
    console.error(`Please provide a valid base64 PDF content, that starts with "${PDF_PREFIX}"`);
  }

  return (
    <Backdrop className={`common pdf-viewer ${className}`} open={isOpen}>
      <Grid container className="pdf-viewer--header">
        <Grid item xs={6}>
          <a download={filename} href={content}>
            <IconButton>
              <Icon isAssetIcon={false} type={<Download />} />
            </IconButton>
          </a>

          <IconButton onClick={zoomIn}>
            <Icon isAssetIcon type={ZoomIn} />
          </IconButton>

          <IconButton onClick={zoomOut}>
            <Icon isAssetIcon type={ZoomOut} />
          </IconButton>
        </Grid>

        <Grid item xs={6} container justify="flex-end" alignItems="center">
          <Grid item xs={8} className="pdf-viewer--dropdown">
            {hasDropdown && dropdown}
          </Grid>

          <Grid item xs={1}>
            <IconButton onClick={onClose} className="close-btn">
              <Icon isAssetIcon={false} type={<Close />} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className="pdf-viewer--content" justify="center">
        <Document onLoadError={console.error} file={content} onLoadSuccess={onDocumentLoadSuccess} loading={<PDFLoadingMessage />} noData={<PDFLoadingMessage />}>
          {Children.toArray(pages.map((page, index) => <Page scale={pageScale} width={INITIAL_PAGE_WIDTH} pageNumber={index + 1} />))}
        </Document>
      </Grid>
    </Backdrop>
  );
};

PDFViewer.defaultProps = {
  className: '',
  hasDropdown: false,
  dropdown: '',
  isOpen: false,
  onClose: null,
  content: '',
  filename: 'maybank2u.pdf',
};

PDFViewer.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string, // base64 of PDF content
  filename: PropTypes.string,
  hasDropdown: PropTypes.bool,
  dropdown: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

