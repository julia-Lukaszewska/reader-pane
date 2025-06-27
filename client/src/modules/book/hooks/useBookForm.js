import { useState, useEffect } from 'react'

export default function useBookForm(book) {
  const [form, setForm] = useState({ meta: {}, flags: {}, stats: {} })

  useEffect(() => {
    if (book) setForm(structuredClone(book))
  }, [book])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      if (name in prev.meta) {
        return { ...prev, meta: { ...prev.meta, [name]: value } }
      }
      if (name in prev.flags) {
        const currentType = typeof prev.flags[name]
        let parsed = value
        if (currentType === 'boolean') parsed = value === 'true' || value === true
        else if (currentType === 'number') parsed = Number(value)
        return { ...prev, flags: { ...prev.flags, [name]: parsed } }
      }
      return prev
    })
  }

  const handleFlagFieldChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      flags: { ...prev.flags, [name]: value },
    }))
  }

  return { form, setForm, handleChange, handleFlagFieldChange }
}
