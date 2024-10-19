import { ArrowUpDown, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import codeforcesSvg from './assets/codeforces.svg'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import UserCard from './components/UserCard'

export default function SampleTable({ users }) {
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [searchTerm, setSearchTerm] = useState('')
  const [ratingRange, setRatingRange] = useState([0, 3500])
  const [selectedYear, setSelectedYear] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedRank, setSelectedRank] = useState('all')

  const handleSearch = event => {
    setSearchTerm(event.target.value)
    filterUsers(event.target.value, ratingRange, selectedYear, selectedRank)
  }

  const handleYearChange = value => {
    setSelectedYear(value)
    filterUsers(searchTerm, ratingRange, value, selectedRank)
  }

  const handleRankChange = value => {
    setSelectedRank(value)
    filterUsers(searchTerm, ratingRange, selectedYear, selectedRank, value)
  }

  const handleSort = field => {
    const order = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc'
    setSortBy(field)
    setSortOrder(order)
    sortUsers(filteredUsers, field, order)
  }

  const sortUsers = (users, field, order) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (order === 'asc') {
        return a[field] - b[field]
      }
      return b[field] - a[field]
    })
    setFilteredUsers(sortedUsers)
  }

  useEffect(() => {
    filterUsers(
      searchTerm,
      ratingRange,
      selectedYear,
      selectedRank,
      filteredUsers,
    )
  }, [searchTerm, ratingRange, selectedYear, selectedRank, filteredUsers])

  const filterUsers = (searchTerm, ratingRange, selectedYear, selectedRank) => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedYear && selectedYear !== 'all') {
      filtered = filtered.filter(user => user.year === selectedYear)
    }

    filtered = filtered.filter(
      user =>
        user.currentRating >= minRating && user.currentRating <= maxRating,
    )

    if (selectedRank && selectedRank !== 'all') {
      filtered = filtered.filter(
        user => getRank(user.currentRating).name === selectedRank,
      )
    }

    sortUsers(filtered, sortBy, sortOrder)
  }

  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(3500)
  const [error, setError] = useState(null)

  const getRank = rating => {
    if (rating < 1200) return { name: 'Newbie', color: 'text-gray-500' }
    if (rating < 1400) return { name: 'Pupil', color: 'text-green-500' }
    if (rating < 1600) return { name: 'Specialist', color: 'text-cyan-500' }
    if (rating < 1900) return { name: 'Expert', color: 'text-blue-700' }
    if (rating < 2100)
      return { name: 'Candidate Master', color: 'text-purple-700' }
    if (rating < 2300) return { name: 'Master', color: 'text-orange-500' }
    if (rating < 2400)
      return { name: 'International Master', color: 'text-orange-500' }
    if (rating < 2600) return { name: 'Grandmaster', color: 'text-red-500' }
    if (rating < 3000)
      return { name: 'International Grandmaster', color: 'text-red-500' }
    return { name: 'Legendary Grandmaster', color: 'text-red-600' }
  }

  const handleMinChange = e => {
    const value = parseInt(e.target.value)
    if (isNaN(value)) {
      setMinRating(0)
    } else {
      setMinRating(Math.max(0, Math.min(value, 4000)))
    }
    filterUsers(searchTerm, ratingRange, selectedYear, selectedRank)
  }

  const handleMaxChange = e => {
    const value = parseInt(e.target.value)
    if (isNaN(value)) {
      setMaxRating(4000)
    } else {
      setMaxRating(Math.max(0, Math.min(value, 4000)))
    }
    filterUsers(searchTerm, ratingRange, selectedYear, selectedRank)
  }

  useEffect(() => {
    if (minRating > maxRating) {
      setError('Minimum rating cannot be greater than maximum rating')
    } else {
      setError(null)
    }
  }, [minRating, maxRating])

  const minRank = getRank(minRating)
  const maxRank = getRank(maxRating)

  return (
    <div className='container p-4 mx-auto'>
      <div className='text-center'>
        <img
          src={codeforcesSvg}
          alt='Codeforces'
          className='w-32 h-32 mx-auto mb-4'
        />
        <h1 className='mb-4 text-2xl font-bold'>Codeforces Users</h1>
      </div>
      <div className='grid gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4'>
        <div>
          <Label htmlFor='search'>Search by Name</Label>
          <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              id='search'
              placeholder='Search users...'
              value={searchTerm}
              onChange={handleSearch}
              className='pl-8'
            />
          </div>
        </div>
        <div>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label htmlFor='min-rating'>Min Rating</Label>
              <Input
                id='min-rating'
                type='number'
                min={0}
                max={4000}
                value={minRating}
                onChange={handleMinChange}
              />
            </div>
            <div>
              <Label htmlFor='max-rating'>Max Rating</Label>
              <Input
                id='max-rating'
                type='number'
                min={0}
                max={4000}
                value={maxRating}
                onChange={handleMaxChange}
              />
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor='rank'>Rank</Label>
          <Select value={selectedRank} onValueChange={handleRankChange}>
            <SelectTrigger id='rank'>
              <SelectValue placeholder='Select Rank' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Ranks</SelectItem>
              <SelectItem value='Newbie'>Newbie</SelectItem>
              <SelectItem value='Pupil'>Pupil</SelectItem>
              <SelectItem value='Specialist'>Specialist</SelectItem>
              <SelectItem value='Expert'>Expert</SelectItem>
              <SelectItem value='Candidate Master'>Candidate Master</SelectItem>
              <SelectItem value='Master'>Master</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='year'>Campus Year</Label>
          <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger id='year'>
              <SelectValue placeholder='Select Year' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Years</SelectItem>
              <SelectItem value='1'>1st Year</SelectItem>
              <SelectItem value='2'>2nd Year</SelectItem>
              <SelectItem value='3'>3rd Year</SelectItem>
              <SelectItem value='4'>4th Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex gap-2 mb-4'>
        <Button variant='outline' onClick={() => handleSort('currentRating')}>
          Sort by Rating <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
        <Button variant='outline' onClick={() => handleSort('peakRating')}>
          Sort by Peak Rating <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      </div>
      {filteredUsers.length === 0 ? (
        <p className='text-center text-gray-500'>No users found</p>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredUsers.map(user => (
            <UserCard key={user.bitsId} {...user} />
          ))}
        </div>
      )}
    </div>
  )
}
