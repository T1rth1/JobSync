import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import React, { useState } from 'react';


const PdfViewer = React.memo(({ fileURL }) => {
  return (
    <div className="h-[calc(100vh-120px)] border border-gray-300 rounded-lg overflow-hidden">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer fileUrl={fileURL} />
      </Worker>
    </div>
  );
});

export default PdfViewer;
