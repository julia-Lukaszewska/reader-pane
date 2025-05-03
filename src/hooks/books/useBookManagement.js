//-----------------------------------------------------------------------------
//------ useBookManagement – Manage book selection and managing mode 
//-----------------------------------------------------------------------------

import { useState } from 'react'

const useBookManagement = () => {
  const [isManaging, setIsManaging] = useState(false)
  const [selectedBooks, setSelectedBooks] = useState([])

  const toggleManaging = () => {
    setIsManaging((prev) => !prev)
    setSelectedBooks([])
  }

  const handleSelectBook = (bookId) => {
    setSelectedBooks((prevSelected) =>
      prevSelected.includes(bookId)
        ? prevSelected.filter((id) => id !== bookId)
        : [...prevSelected, bookId]
    )
  }

  const clearSelectedBooks = () => {
    setSelectedBooks([])
  }

  return {
    isManaging,
    toggleManaging,
    selectedBooks,
    handleSelectBook,
    clearSelectedBooks,
  }
}
export default useBookManagement
