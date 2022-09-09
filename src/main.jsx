import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import './index.css'

export const queryClient = new QueryClient({
})

ReactDOM.createRoot(document.getElementById('root') || document.createElement('div')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App/>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>
)
