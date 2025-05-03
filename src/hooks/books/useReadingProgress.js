//-----------------------------------------------------------------------------
//------ useReadingProgress: Manage reading progress per book 
//-----------------------------------------------------------------------------

import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage } from '@/store'

const useReadingProgress = () => {
  const dispatch = useDispatch() 
  const bookId = useSelector((state) => state.reader.activeBook?._id) 
  const currentPage = useSelector((state) => state.reader.currentPage) 

  //-----------------------------------------------------------------------------
  //-------– Load saved progress once when bookId changes 
  //-----------------------------------------------------------------------------
  useEffect(() => {
    if (!bookId) return 
    const key = `progress-${bookId}` 
    const saved = localStorage.getItem(key) 
    const page = saved ? Number(saved) : 1 
    dispatch(setCurrentPage(page)) 
  }, [bookId, dispatch]) 

  //-----------------------------------------------------------------------------
  //------– Save every change of currentPage to localStorage 
  //-----------------------------------------------------------------------------
  const prevPageRef = useRef(null) 
  useEffect(() => {
    if (!bookId) return 
    if (prevPageRef.current === currentPage) return 
    prevPageRef.current = currentPage 
    const key = `progress-${bookId}` 
    localStorage.setItem(key, currentPage) 
  }, [currentPage, bookId]) 

  //-----------------------------------------------------------------------------
  //--------Expose setter to manually change page 
  //-----------------------------------------------------------------------------
  const setPage = (page) => {
    if (!bookId) return 
    dispatch(setCurrentPage(page)) 
  }

  return { currentPage, setCurrentPage: setPage } 
}

export default useReadingProgress 
