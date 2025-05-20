//-----------------------------------------------------------------------------
// usePDFValidation: Validates if uploaded file is a PDF
//-----------------------------------------------------------------------------

import { useCallback } from 'react';

const usePDFValidation = () => {
  const validate = useCallback((file) => {
    if (!file || file.type !== 'application/pdf') {
      alert('Invalid file format. Please upload a PDF file.');
      return false;
    }
    return true;
  }, []);

  return { validate };
};

export default usePDFValidation;
