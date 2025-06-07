/**
 * @file useLoadPDFDocument.js
 * @description
 * React hook that loads a PDF document for the active book using pdf.js.
 * Stores the loaded PDF in pdfRef.current and triggers onLoaded when done.
 */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
import useEnsureBookFileUrl from './useEnsureBookFileUrl';

/**
 * Loads a PDF document from the backend once bookId, book data, and access token are available.
 * - Uses pdf.js to load and cache the document in pdfRef
 * - Calls onLoaded callback once document is fully loaded
 *
 * @param {Object} params
 * @param {React.MutableRefObject} params.pdfRef - Ref to store the loaded PDF document
 * @param {Function} [params.onLoaded] - Optional callback triggered after PDF is loaded
 * @returns {{ isFetching: boolean, isError: boolean }}
 */
export default function useLoadPDFDocument({ pdfRef, onLoaded }) {
  const { bookId } = useParams();
  const accessToken = useSelector((state) => state.auth.access);
  const book = useSelector((state) => state.books.entities[bookId]);
  const fileUrl = useEnsureBookFileUrl(book);

  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!bookId || !accessToken || !fileUrl || !book) {
      return;
    }

    if (!pdfRef || pdfRef.current) {
      return;
    }

    let cancelled = false;
    setIsFetching(true);
    setIsError(false);

    (async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: `${import.meta.env.VITE_API_URL}${fileUrl}`,
          withCredentials: false,
        });
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        pdfRef.current = pdf;
        if (onLoaded) onLoaded(pdf);
      } catch (error) {
        if (cancelled) return;
        console.error('[useLoadPDFDocument] Error loading PDF:', error);
        setIsError(true);
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [bookId, accessToken, fileUrl, book, pdfRef, onLoaded]);

  return { isFetching, isError };
}
