import { TrendingUp, Trophy, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import codeforcesSvg from './assets/codeforces.svg'
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

export default function HomePage({ users }) {
  const [newName, setNewName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {}

  const handleSearch = () => {}

  const getColor = rating => {
    if (rating < 1200) return 'text-gray-500'
    if (rating < 1400) return 'text-green-500'
    if (rating < 1600) return 'text-cyan-500'
    if (rating < 1900) return 'text-blue-700'
    if (rating < 2100) return 'text-purple-700'
    if (rating < 2300) return 'text-orange-500'
    if (rating < 2400) return 'text-orange-500'
    if (rating < 2600) return 'text-red-500'
    if (rating < 3000) return 'text-red-500'
    return 'text-red-600'
  }

  const getColorCodes = rating => {
    if (rating < 1200) return '#d1d5db'
    if (rating < 1400) return '#10b981'
    if (rating < 1600) return '#22d3ee'
    if (rating < 1900) return '#3b82f6'
    if (rating < 2100) return '#8b5cf6'
    if (rating < 2300) return '#f59e0b'
    if (rating < 2400) return '#f59e0b'
    if (rating < 2600) return '#ef4444'
    if (rating < 3000) return '#ef4444'
    return '#dc2626'
  }

  const sortedUsers = users.sort((a, b) => b.currentRating - a.currentRating)
  const bestRatedPlayer = users.reduce((prev, current) => {
    return prev.currentRating > current.currentRating ? prev : current
  })

  const chartData = sortedUsers.slice(0, 7).map(user => ({
    name: user.name.split(' ')[0],
    rating: user.currentRating,
    color: getColorCodes(user.currentRating),
  }))

  console.log(chartData)
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container flex-grow p-4 mx-auto'>
        <nav className='flex items-center justify-between p-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
          <img src={codeforcesSvg} alt='Codeforces' className='w-8 h-8' />
          <h1 className='text-xl font-bold text-transparent bg-black md:text-3xl bg-clip-text'>
            Codeforces Dashboard
          </h1>
          <div className='flex gap-4'>
            <Dialog>
              <DialogTrigger asChild>
                {/* <Button
                  variant='outline'
                  className='transition-colors hover:bg-blue-50 dark:hover:bg-gray-700'
                >
                  Add New Coder
                </Button> */}
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

        <div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-2'>
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
        </div>

        <Tabs defaultValue='chart' className='space-y-4'>
          <TabsList className='grid w-full grid-cols-3 bg-gray-200 dark:bg-gray-700'>
            <TabsTrigger
              value='chart'
              className='data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800'
            >
              Top Ratings
            </TabsTrigger>
            <TabsTrigger
              value='topPerformers'
              className='data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800'
            >
              Top Performers
            </TabsTrigger>
            <TabsTrigger
              value='top7Compare'
              className='data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800'
            >
              Top 7 Comparison
            </TabsTrigger>
          </TabsList>
          <TabsContent value='chart'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <TrendingUp className='w-4 h-4 mr-2' />
                  Top Ratings
                </CardTitle>
                <CardDescription>
                  Codeforces ratings of Top Performers
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
                  className={getColor(chartData.rating)}
                >
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart accessibilityLayer data={chartData}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='name' />
                      <YAxis />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Legend />
                      <Bar
                        dataKey='rating'
                        fill='hsl(var(--chart-1))'
                        barSize={40}
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
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
                  {sortedUsers.slice(0, 7).map(user => (
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
                          <p className='text-sm text-gray-500 text-muted-foreground'>
                            {user.handle}
                          </p>
                        </div>
                      </div>
                      <span className={getColor(user.currentRating)}>
                        {user.currentRating}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='top7Compare'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Trophy className='w-4 h-4 mr-2' />
                  Top 7 Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <video width='100%' controls>
                  <source src='top7.mp4' type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
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
