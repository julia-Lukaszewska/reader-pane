import { forwardRef, useContext } from 'react' // React utilities  
import styled from 'styled-components' // CSS-in-JS library  
import { AppContext } from '../context/AppContext' // Global state context  
import { uploadBook, getBooks } from '../utils/api' // API functions  

// -----------------------------------------------------------------------------
//------ Styled input (hidden)  
// -----------------------------------------------------------------------------

const HiddenInput = styled.input`
  display: none;
`  

// -----------------------------------------------------------------------------
//------ UploadBtn component  
// -----------------------------------------------------------------------------

const UploadBtn = forwardRef((_, ref) => {
  const { dispatch } = useContext(AppContext) // Access dispatch from context  

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file || file.type !== 'application/pdf') {
      alert('Nieprawidłowy format pliku. Wgraj plik PDF.') // Validation alert  
      return
    }

    const formData = new FormData()
    formData.append('file', file) // Append file to FormData  

    try {
      const uploadedBook = await uploadBook(formData) // Upload via API  

      if (uploadedBook?.fileUrl) {
        dispatch({ type: 'ADD_BOOK', payload: uploadedBook }) // Add to local state  

        const books = await getBooks() // Fetch updated library  
        dispatch({ type: 'SET_LIBRARY', payload: books }) // Update state  
      }
    } catch (err) {
      console.error('Błąd wgrywania pliku:', err)
      alert('Nie udało się przesłać pliku.') // Error alert  
    } finally {
      e.target.value = null // Reset input after upload  
    }
  }

  return (
    <HiddenInput
      type="file"
      accept="application/pdf"
      ref={ref}
      onChange={handleFileChange}
    />
  )
})

export default UploadBtn // Export default component  
