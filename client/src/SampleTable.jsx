import { ArrowUpDown, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
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
  const [selectedBranch, setSelectedBranch] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [sortOrder, setSortOrder] = useState('desc')

  const handleSearch = event => {
    setSearchTerm(event.target.value)
    filterUsers(event.target.value, ratingRange, selectedYear, selectedBranch)
  }

  const handleYearChange = value => {
    setSelectedYear(value)
    filterUsers(searchTerm, ratingRange, value, selectedBranch)
  }

  const handleBranchChange = value => {
    setSelectedBranch(value)
    filterUsers(searchTerm, ratingRange, selectedYear, value)
  }

  const filterUsers = (search, ratings, year, branch) => {
    let result = users.filter(user => {
      const matchesName = user.name.toLowerCase().includes(search.toLowerCase())
      const matchesRating =
        user.currentRating >= ratings[0] && user.currentRating <= ratings[1]
      const matchesYear = year === 'all' || user.bitsId.substring(0, 4) === year
      const matchesBranch = branch === 'all' || user.branch === branch
      return matchesName && matchesRating && matchesYear && matchesBranch
    })

    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] - b[sortBy]
      } else {
        return b[sortBy] - a[sortBy]
      }
    })

    setFilteredUsers(result)
  }

  const handleSort = field => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
    filterUsers(searchTerm, ratingRange, selectedYear, selectedBranch)
  }

  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(3500)
  const [error, setError] = useState(null)

  const getRank = rating => {
    if (rating < 1200) return { name: 'Newbie', color: 'text-gray-500' }
    if (rating < 1400) return { name: 'Pupil', color: 'text-green-500' }
    if (rating < 1600) return { name: 'Specialist', color: 'text-cyan-500' }
    if (rating < 1900) return { name: 'Expert', color: 'text-blue-500' }
    if (rating < 2100)
      return { name: 'Candidate Master', color: 'text-purple-500' }
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
  }

  const handleMaxChange = e => {
    const value = parseInt(e.target.value)
    if (isNaN(value)) {
      setMaxRating(4000)
    } else {
      setMaxRating(Math.max(0, Math.min(value, 4000)))
    }
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
      <h1 className='mb-4 text-2xl font-bold'>Codeforces Users</h1>
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
        <div>
          <Label htmlFor='branch'>Campus Branch</Label>
          <Select value={selectedBranch} onValueChange={handleBranchChange}>
            <SelectTrigger id='branch'>
              <SelectValue placeholder='Select Branch' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Branches</SelectItem>
              <SelectItem value='Computer Science'>Computer Science</SelectItem>
              <SelectItem value='Electrical Engineering'>
                Electrical Engineering
              </SelectItem>
              <SelectItem value='Mechanical Engineering'>
                Mechanical Engineering
              </SelectItem>
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
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {users.map(user => (
          <UserCard key={user.bitsId} {...user} />
        ))}
      </div>
    </div>
  )
}
