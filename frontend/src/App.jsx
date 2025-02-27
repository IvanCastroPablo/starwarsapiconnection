import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import MovieList from './MovieList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <MovieList />
      </div>
    </>
  )
}

export default App;
