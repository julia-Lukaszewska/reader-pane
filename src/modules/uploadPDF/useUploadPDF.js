//-----------------------------------------------------------------------------
// useUploadPDF: Extracts metadata & uploads a PDF book to backend
//-----------------------------------------------------------------------------

import { useState } from 'react';
import { useUploadBookMutation } from '@/store/api/booksApi';
import usePDFValidation from './usePDFValidation';
import { extractPDFMetadata } from './extractPDFMetadata';
import { renderPDFCover } from './renderPDFCover';

const useUploadPDF = () => {
  //-----------------------------------------------------------------------------
  //  Setup: RTK mutation, validation hook, loading state
  //-----------------------------------------------------------------------------
  const [uploadBook] = useUploadBookMutation();
  const { validate } = usePDFValidation();
  const [uploading, setUploading] = useState(false);

  //-----------------------------------------------------------------------------
  //  Upload handler
  //-----------------------------------------------------------------------------
  const handleUpload = async (file) => {
    if (!validate(file)) return;

    setUploading(true);
    try {
      //  Extract metadata from PDF
      const {
        title,
        author,
        subject,
        keywords,
        language,
        publicationDate,
        publishedYear,
        totalPages,
      } = await extractPDFMetadata(file);

      //  Generate cover image
      const cover = await renderPDFCover(file);

      //  Build FormData to send to backend
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('author', author);
      formData.append('subject', subject);
      if (keywords.length) formData.append('keywords', keywords.join(','));
      if (language) formData.append('language', language);
      if (publicationDate) formData.append('publicationDate', publicationDate);
      if (publishedYear) formData.append('publishedYear', publishedYear);
      formData.append('totalPages', totalPages);
      formData.append('cover', cover);

      //  Upload via API
      const savedBook = await uploadBook(formData).unwrap();
      return { success: true, savedBook };
    } finally {
      setUploading(false);
    }
  }

  return { handleUpload, uploading };
};

export default useUploadPDF;
