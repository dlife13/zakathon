import axios from 'axios'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import SampleTable from './SampleTable'

function App() {
  const [users, setUsers] = useState([])
  const [showHomePage, setShowHomePage] = useState(false)

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/api/users')
    setUsers(response.data)
  }

  useEffect(() => {
    fetchAPI()
    const timer = setTimeout(() => {
      setShowHomePage(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Routes>
      {showHomePage && <Route path='/' element={<HomePage users={users} />} />}
      {<Route path='/all' element={<SampleTable users={users} />} />}
    </Routes>
  )
}

export default App
