import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function UserCard({ ...user }) {
  return (
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
  )
}
