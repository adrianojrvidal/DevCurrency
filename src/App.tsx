// Hooks
//import { useState } from 'react'

// React Router
import { RouterProvider } from "react-router-dom";

// Rotas
import { router } from "./routes";

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
