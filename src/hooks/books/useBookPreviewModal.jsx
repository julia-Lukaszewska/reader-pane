// src/hooks/useBookPreviewModal.js
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveLastBookId } from '@/utils'
import { updateBook } from '@/store'

// Custom hook handling BookPreviewModal logic
export function useBookPreviewModal(book, onClose) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    notes: '',
    publishedYear: '',
    createdAt: '',
    updatedAt: '',
    lastReadAt: '',
    isFavorite: false,
    rating: 0,
    progress: 0,
    totalPages: book.totalPages || 1,
    tags: '',
  })
  const [isEditing, setIsEditing] = useState(false)

  // Initialize form on book change
  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        notes: book.notes || '',
        publishedYear: book.publishedYear || '',
        createdAt: book.createdAt || '',
        updatedAt: book.updatedAt || '',
        lastReadAt: book.lastReadAt || '',
        isFavorite: book.isFavorite || false,
        rating: book.rating || 0,
        progress: book.progress || 0,
        totalPages: 1,
        tags: (book.tags || []).join(', '),
      })
      setIsEditing(false)
    }
  }, [book])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }
  const handleEdit = () => setIsEditing(true)
  const handleSave = () => {
    dispatch(
      updateBook({
        _id: book._id,
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()),
        totalPages: Number(form.totalPages), 
      })
    )

    setIsEditing(false)
  }
  const handleRead = () => {
    saveLastBookId(book._id)
    navigate(`/read/${book._id}`)
  }
  const handleClose = () => onClose()

  return {
    form,
    isEditing,
    handleChange,
    handleEdit,
    handleSave,
    handleRead,
    handleClose,
  }
}
