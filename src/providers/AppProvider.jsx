import { Provider } from 'react-redux'
import { store } from '@/store'
import { GlobalStyles } from '@/styles'

export default function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <GlobalStyles />
      {children}
    </Provider>
  )
}
