import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import routes from '@/router/index'
import './App.css'
import { useRoutes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const route = useRoutes(routes)
  return (
    <div className='app'>
      {route}
    </div>
  )
}

export default App
