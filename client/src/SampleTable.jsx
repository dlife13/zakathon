import { ArrowUpDown, ExternalLink, Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import { Slider } from './components/ui/slider'

const users = [
  {
    id: 1,
    name: 'John Doe',
    codeforcesId: 'john_doe',
    studentId: '2021001',
    rating: 1800,
    peakRating: 2000,
    avatar: 'https://i.pravatar.cc/100?img=1',
    campusYear: 3,
    campusBranch: 'Computer Science',
  },
  {
    id: 2,
    name: 'Jane Smith',
    codeforcesId: 'jane_smith',
    studentId: '2021002',
    rating: 2200,
    peakRating: 2300,
    avatar: 'https://i.pravatar.cc/100?img=2',
    campusYear: 2,
    campusBranch: 'Electrical Engineering',
  },
]

export default function Component() {
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

  const handleRatingChange = value => {
    setRatingRange(value)
    filterUsers(searchTerm, value, selectedYear, selectedBranch)
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
        user.rating >= ratings[0] && user.rating <= ratings[1]
      const matchesYear = year === 'all' || user.campusYear.toString() === year
      const matchesBranch = branch === 'all' || user.campusBranch === branch
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

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Codeforces Users</h1>
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
          <Label>Rating Range</Label>
          <Slider
            min={0}
            max={3500}
            step={100}
            value={ratingRange}
            onValueChange={handleRatingChange}
            className='mt-2'
          />
          <div className='flex justify-between text-sm text-muted-foreground mt-1'>
            <span>{ratingRange[0]}</span>
            <span>{ratingRange[1]}</span>
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
        <Button variant='outline' onClick={() => handleSort('rating')}>
          Sort by Rating <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
        <Button variant='outline' onClick={() => handleSort('peakRating')}>
          Sort by Peak Rating <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {filteredUsers.map(user => (
          <Card key={user.id}>
            <CardHeader>
              <img
                src={user.avatar}
                alt={user.name}
                className='w-16 h-16 rounded-full mx-auto'
              />
              <CardTitle className='text-center mt-2'>{user.name}</CardTitle>
              <p className='text-center text-gray-500'>{user.codeforcesId}</p>
            </CardHeader>
            <CardContent className='text-center'>
              <p>Student ID: {user.studentId}</p>
              <div className='flex justify-between mt-2'>
                <p>Current Rating: {user.rating}</p>
                <p>Peak Rating: {user.peakRating}</p>
              </div>
            </CardContent>
            <CardFooter>
              <a
                href={`https://codeforces.com/profile/${user.codeforcesId}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center text-blue-500 hover:underline'
              >
                View Profile <ExternalLink className='ml-1 h-4 w-4' />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
