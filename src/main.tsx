import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { NuqsAdapter } from 'nuqs/adapters/react'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NuqsAdapter>
          <App />
        </NuqsAdapter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
