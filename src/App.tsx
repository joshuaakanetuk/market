import { useState } from 'react'
import './App.css'
import { EbaySearchModal } from './components/EbaySearchModal'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ProductsView } from './components/ProductsView'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
      <QueryClientProvider client={queryClient}>
       <div className='w-full'>
       <EbaySearchModal />
       <ProductsView/>
       </div>
      </QueryClientProvider>
  )
}

export default App
