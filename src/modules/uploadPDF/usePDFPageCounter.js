//-----------------------------------------------------------------------------
// usePDFPageCounter: Returns page count for a PDF file using PDF.js
//-----------------------------------------------------------------------------

import { useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const usePDFPageCounter = () => {
  const countPages = useCallback(async (file) => {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    return pdf.numPages;
  }, []);

  return { countPages };
};

export default usePDFPageCounter;
