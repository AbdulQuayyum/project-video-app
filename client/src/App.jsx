import React from 'react'
import { Toaster } from 'react-hot-toast';

import MainLayout from './Layout/Main.Layout'

const App = () => {
  return (
    <>
      <Toaster />
      <MainLayout />
    </>
  )
}

export default App