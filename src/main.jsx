import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')).render(
  
  <SnackbarProvider maxSnack={2}>
    <App />
  </SnackbarProvider>
)
