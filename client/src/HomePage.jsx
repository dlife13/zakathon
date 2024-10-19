import { Search, TrendingUp, Trophy, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './components/ui/chart'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import { Input } from './components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'

const chartData = [
  { name: 'Jan', rating: 1200 },
  { name: 'Feb', rating: 1300 },
  { name: 'Mar', rating: 1250 },
  { name: 'Apr', rating: 1400 },
  { name: 'May', rating: 1350 },
  { name: 'Jun', rating: 1500 },
]

// const users = [
//   {
//     bitsId: '2022A7PS1127G',
//     handle: 'unbased',
//     name: 'Anwesh Das',
//     currentRating: 1609,
//     peakRating: 1636,
//     pfp: 'https://userpic.codeforces.org/3072648/title/b28840495b178d3c.jpg',
//     rank: 'expert',
//     peakRank: 'expert',
//     branch: ['CSE'],
//   },
//   {
//     bitsId: '2021A7PS3055G',
//     handle: 'niranjanrajeev25',
//     name: 'Niranjan Rajeev',
//     currentRating: 1652,
//     peakRating: 1686,
//     pfp: 'https://userpic.codeforces.org/no-title.jpg',
//     rank: 'expert',
//     peakRank: 'expert',
//     branch: ['CSE'],
//   },
// ]

export default function HomePage({ users }) {
  const [newName, setNewName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {}

  const handleSearch = () => {}

  const bestRatedPlayer = users.reduce((prev, current) => {
    return prev.currentRating > current.currentRating ? prev : current
  })
  console.log(users)

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container flex-grow p-4 mx-auto'>
        <nav className='flex items-center justify-between p-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
          <h1 className='text-3xl font-bold text-transparent bg-black bg-clip-text'>
            Codeforces Dashboard
          </h1>
          <div className='flex gap-4'>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='transition-colors hover:bg-blue-50 dark:hover:bg-gray-700'
                >
                  Add New Coder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Coder</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                  <Input
                    type='text'
                    placeholder='Enter name'
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                  />
                  <Button type='submit'>Add</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              variant='outline'
              className='transition-colors hover:bg-blue-50 dark:hover:bg-gray-700'
              onClick={() => navigate('/all')}
            >
              View All
            </Button>
          </div>
        </nav>

        <div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-3'>
          <Card className='transition-shadow hover:shadow-lg'>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
              <Users className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{users.length}</div>
              <p className='text-xs text-muted-foreground'>
                Active participants
              </p>
            </CardContent>
          </Card>
          <Card className='transition-shadow hover:shadow-lg'>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>
                Best Rated Player
              </CardTitle>
              <Trophy className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='flex items-center space-x-4'>
                <Avatar>
                  <AvatarImage
                    src={bestRatedPlayer.pfp}
                    alt={bestRatedPlayer.name}
                  />
                  <AvatarFallback>
                    {bestRatedPlayer.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-lg font-semibold'>
                    {bestRatedPlayer.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {bestRatedPlayer.handle}
                  </p>
                  <p className='text-sm font-medium'>
                    Rating: {bestRatedPlayer.currentRating}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='transition-shadow hover:shadow-lg'>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium'>Search</CardTitle>
              <Search className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className='flex gap-2'>
                <Input
                  type='text'
                  placeholder='Search users...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='flex-grow'
                />
                <Button
                  type='submit'
                  size='icon'
                  className='transition-colors hover:bg-blue-600'
                >
                  <Search className='w-4 h-4' />
                  <span className='sr-only'>Search</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue='chart' className='space-y-4'>
          <TabsList className='grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-700'>
            <TabsTrigger
              value='chart'
              className='data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800'
            >
              Rating Progress
            </TabsTrigger>
            <TabsTrigger
              value='topPerformers'
              className='data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800'
            >
              Top Performers
            </TabsTrigger>
          </TabsList>
          <TabsContent value='chart'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <TrendingUp className='w-4 h-4 mr-2' />
                  Rating Progress
                </CardTitle>
                <CardDescription>
                  Your Codeforces rating over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    rating: {
                      label: 'Rating',
                      color: 'hsl(var(--chart-1))',
                    },
                  }}
                  className='h-[300px]'
                >
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='name' />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type='monotone'
                        dataKey='rating'
                        stroke='hsl(var(--chart-1))'
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='topPerformers'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Trophy className='w-4 h-4 mr-2' />
                  Top Performers
                </CardTitle>
                <CardDescription>Top 7 rated coders</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-4'>
                  {users.map(user => (
                    <li
                      key={user.bitsId}
                      className='flex items-center justify-between p-2 transition-colors rounded-md hover:bg-gray-50 dark:hover:bg-gray-800'
                    >
                      <div className='flex items-center space-x-4'>
                        <Avatar>
                          <AvatarImage src={user.pfp} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-semibold'>{user.name}</p>
                          <p className='text-sm text-muted-foreground'>
                            {user.handle}
                          </p>
                        </div>
                      </div>
                      <span className='font-semibold text-blue-600 dark:text-blue-400'>
                        {user.currentRating}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <footer className='py-4 mt-8 bg-white shadow-md dark:bg-gray-800'>
        <div className='container mx-auto text-sm text-center text-muted-foreground'>
          © {new Date().getFullYear()} Codeforces Dashboard. All rights
          reserved.
        </div>
      </footer>
    </div>
  )
}
