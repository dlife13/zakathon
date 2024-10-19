import { Search, TrendingUp, Trophy, Users } from 'lucide-react'
import { useState } from 'react'
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

const topPerformers = [
  {
    name: 'Alice Johnson',
    rating: 2400,
    id: 'alice_j',
    avatar: '/placeholder.svg?height=32&width=32',
  },
  {
    name: 'Bob Smith',
    rating: 2350,
    id: 'bob_s',
    avatar: '/placeholder.svg?height=32&width=32',
  },
  {
    name: 'Charlie Brown',
    rating: 2300,
    id: 'charlie_b',
    avatar: '/placeholder.svg?height=32&width=32',
  },
  {
    name: 'David Lee',
    rating: 2250,
    id: 'david_l',
    avatar: '/placeholder.svg?height=32&width=32',
  },
  {
    name: 'Eve Taylor',
    rating: 2200,
    id: 'eve_t',
    avatar: '/placeholder.svg?height=32&width=32',
  },
  {
    name: 'Frank Wilson',
    rating: 2150,
    id: 'frank_w',
    avatar: '/placeholder.svg?height=32&width=32',
  },
  {
    name: 'Grace Davis',
    rating: 2100,
    id: 'grace_d',
    avatar: '/placeholder.svg?height=32&width=32',
  },
]

export default function Component() {
  const [newName, setNewName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = () => {}

  const handleSearch = () => {}

  const bestRatedPlayer = topPerformers[0]

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto p-4 flex-grow'>
        <nav className='flex justify-between items-center mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md'>
          <h1 className='text-3xl font-bold bg-black bg-clip-text text-transparent'>
            Codeforces Dashboard
          </h1>
          <div className='flex gap-4'>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors'
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
              className='hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors'
            >
              View All
            </Button>
          </div>
        </nav>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{topPerformers.length}</div>
              <p className='text-xs text-muted-foreground'>
                Active participants
              </p>
            </CardContent>
          </Card>
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Best Rated Player
              </CardTitle>
              <Trophy className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='flex items-center space-x-4'>
                <Avatar>
                  <AvatarImage
                    src={bestRatedPlayer.avatar}
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
                    {bestRatedPlayer.id}
                  </p>
                  <p className='text-sm font-medium'>
                    Rating: {bestRatedPlayer.rating}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Search</CardTitle>
              <Search className='h-4 w-4 text-muted-foreground' />
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
                  className='hover:bg-blue-600 transition-colors'
                >
                  <Search className='h-4 w-4' />
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
                  <TrendingUp className='mr-2 h-4 w-4' />
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
                  <Trophy className='mr-2 h-4 w-4' />
                  Top Performers
                </CardTitle>
                <CardDescription>Top 7 rated coders</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-4'>
                  {topPerformers.map((performer, index) => (
                    <li
                      key={index}
                      className='flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors'
                    >
                      <div className='flex items-center space-x-4'>
                        <Avatar>
                          <AvatarImage
                            src={performer.avatar}
                            alt={performer.name}
                          />
                          <AvatarFallback>
                            {performer.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-semibold'>{performer.name}</p>
                          <p className='text-sm text-muted-foreground'>
                            {performer.id}
                          </p>
                        </div>
                      </div>
                      <span className='font-semibold text-blue-600 dark:text-blue-400'>
                        {performer.rating}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <footer className='bg-white dark:bg-gray-800 py-4 mt-8 shadow-md'>
        <div className='container mx-auto text-center text-sm text-muted-foreground'>
          © {new Date().getFullYear()} Codeforces Dashboard. All rights
          reserved.
        </div>
      </footer>
    </div>
  )
}
