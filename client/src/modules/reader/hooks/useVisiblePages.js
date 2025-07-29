//-----------------------------------------------------------------------------
// Hook: useVisiblePages – Refactored for clarity and DRY principle
//-----------------------------------------------------------------------------
import { useEffect, useRef, useCallback } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { setVisiblePages } from '@/store/slices/streamSlice';
import {
  selectPageViewMode,
  selectCurrentPage,
  selectTotalPages,
} from '@/store/selectors/readerSelectors';
import { selectStreamScale } from '@/store/selectors/streamSelectors';
import { RENDER_OFFSETS } from '@reader/utils/pdfConstants';

/**
 * Helper function to generate an array of numbers within a range.
 * @param {number} start - The starting page number.
 * @param {number} end - The ending page number.
 * @returns {number[]} - An array of page numbers.
 */
const generatePageArray = (start, end) => {
  if (start > end) return [];

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default function useVisiblePages(containerRef, pageHeight) {
  const dispatch = useDispatch();
  const mode = useSelector(selectPageViewMode);
  const scale = useSelector(selectStreamScale);
  const curPage = useSelector(selectCurrentPage);
  const total = useSelector(selectTotalPages);

  const prev = useRef([]);


  const updateVisiblePages = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { before, after } = RENDER_OFFSETS[mode];
    let start, end;

    if (mode === 'scroll') {
      const { scrollTop, clientHeight } = el;
      const pageH = pageHeight * scale;
      const firstVis = Math.floor(scrollTop / pageH) + 1;
      const lastVis = Math.floor((scrollTop + clientHeight - 1) / pageH) + 1;

      start = Math.max(1, firstVis - before);
      end = Math.min(total, lastVis + after);
    } else { // single or double mode
      const step = mode === 'double' ? 2 : 1;
      const last = Math.min(total, curPage + (step - 1));
      
      start = Math.max(1, curPage - before);
      end = Math.min(total, last + after);
    }

    const list = generatePageArray(start, end);
    const prevList = prev.current;

    const changed =
      list.length !== prevList.length || list.some((v, i) => v !== prevList[i]);
    
    if (!changed) return;

    prev.current = list;
    dispatch(setVisiblePages(list));
  }, [containerRef, pageHeight, mode, scale, curPage, total, dispatch]);

  useEffect(() => {
    
    updateVisiblePages();

    if (mode !== 'scroll') return;

    const el = containerRef.current;
    if (!el) return;
    
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateVisiblePages();
        ticking = false;
      });
    };

    el.addEventListener('scroll', onScroll);

    return () => el.removeEventListener('scroll', onScroll);
  }, [mode, updateVisiblePages, containerRef]);
}