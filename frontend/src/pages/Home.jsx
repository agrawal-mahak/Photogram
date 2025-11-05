import React from 'react'

export const Home = ({ user }) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>
        {user ? `Hello ${user.username}` : 'Welcome'}
      </h1>
      <p className='text-lg mt-2.5'>Welcome to the home page</p>
    </div>
  )
}
