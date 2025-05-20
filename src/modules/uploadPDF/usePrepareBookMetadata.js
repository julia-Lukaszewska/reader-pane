import { extractPDFMetadata } from './extractPDFMetadata';
import { renderPDFCover } from './renderPDFCover';

export const usePrepareBookMetadata = () => {
  const prepareMetadata = async (file) => {
    const meta = await extractPDFMetadata(file);
    const cover = await renderPDFCover(file);
    return { ...meta, cover };
  };

  return { prepareMetadata };
};
