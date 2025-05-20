
import { Provider } from 'react-redux'
import { store,persistor } from '@/store'
import { GlobalStyles } from '@/styles'
import { PersistGate } from 'redux-persist/integration/react'
export default function AppProvider({ children }) {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <GlobalStyles />
      {children}
      </PersistGate>
    </Provider>
  )
}
