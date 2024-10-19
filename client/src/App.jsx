import axios from 'axios'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import SampleTable from './SampleTable'

function App() {
  const [users, setUsers] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/api/users')
    setUsers(response.data)
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <Routes>
      <Route path='/all' element={<SampleTable />} />
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default App
