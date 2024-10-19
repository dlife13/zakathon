import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function UserCard({ ...user }) {
  return (
    <Card key={user.bitsId}>
      <CardHeader>
        <img src={user.pfp} alt={user.name} className='w-16 h-16 mx-auto' />
        <CardTitle className='mt-2 text-center'>{user.name}</CardTitle>
        <p className='text-center text-gray-500'>{user.handle}</p>
      </CardHeader>
      <CardContent className='text-center'>
        <p>Student ID: {user.bitsId}</p>
        <div className='flex justify-center mt-2 space-x-6'>
          <p>Rating: {user.currentRating}</p>
          <p>Peak Rating: {user.peakRating}</p>
        </div>
      </CardContent>
      <CardFooter>
        <a
          href={`https://codeforces.com/profile/${user.handle}`}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center text-blue-500 hover:underline'
        >
          View Profile <ExternalLink className='w-4 h-4 ml-1' />
        </a>
      </CardFooter>
    </Card>
  )
}
