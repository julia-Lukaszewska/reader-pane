import * as pdfjsLib from 'pdfjs-dist';

export const extractPDFMetadata = async (file) => {
  //  Load PDF
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
  //  Read metadata
  const meta = await pdf.getMetadata();
  const info = meta.info || {};
  
  //  Basic fields with fallbacks
  const title    = info.Title    || file.name.replace(/\.pdf$/i, '');
  const author   = info.Author   || '';
  const subject  = info.Subject  || '';
  // split comma-separated keywords into array
  const keywords = info.Keywords 
    ? info.Keywords.split(/\s*,\s*/) 
    : [];
  const language = info.Language || '';
  
  //  Parse full creation date D:YYYYMMDDHHmmSS
  let publicationDate = null;
  if (info.CreationDate) {
    const ds = info.CreationDate.replace(/^D:/, '');
    const year  = ds.substr(0, 4);
    const month = ds.substr(4, 2) || '01';
    const day   = ds.substr(6, 2) || '01';
    const hour  = ds.substr(8, 2) || '00';
    const min   = ds.substr(10, 2) || '00';
    const sec   = ds.substr(12, 2) || '00';
    publicationDate = new Date(
      `${year}-${month}-${day}T${hour}:${min}:${sec}Z`
    ).toISOString();
  }

  //  Extract year from publicationDate
  let publishedYear = null;
  if (publicationDate) {
    publishedYear = new Date(publicationDate).getUTCFullYear();
  }

  //  Total pages
  const totalPages = pdf.numPages;

  return {
    title,
    author,
    subject,
    keywords,
    language,
    publicationDate,
    publishedYear,
    totalPages,
  };
};
