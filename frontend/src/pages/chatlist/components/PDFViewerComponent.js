import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFViewerComponent = ({ url }) => {
  return (
    <div style={{ height: '600px', width: '100%' }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={url} />
      </Worker>
    </div>
  );
};

export default PDFViewerComponent;
