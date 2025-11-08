import React from 'react'

export const ProfileEditModal = ({
  isOpen,
  form,
  onChange,
  onSubmit,
  onClose,
  isSaving,
}) => {
  if (!isOpen) return null

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.()
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4 py-6' onClick={handleOverlayClick}>
      <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' />
      <div className='relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-5'>
        <div className='flex items-start justify-between'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900'>Edit profile</h2>
            <p className='text-sm text-gray-500'>Update how others see you on Social Moments.</p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition'
            aria-label='Close profile edit modal'
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='profile-username' className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
              Username
            </label>
            <input
              id='profile-username'
              name='username'
              type='text'
              value={form.username}
              onChange={onChange}
              className='w-full border border-gray-200 focus:border-gray-400 rounded-xl px-4 py-3 text-sm outline-none transition'
              placeholder='Enter your username'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='profile-email' className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
              Email
            </label>
            <input
              id='profile-email'
              name='email'
              type='email'
              value={form.email}
              onChange={onChange}
              className='w-full border border-gray-200 focus:border-gray-400 rounded-xl px-4 py-3 text-sm outline-none transition'
              placeholder='name@example.com'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='profile-password' className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
              New password
            </label>
            <input
              id='profile-password'
              name='password'
              type='password'
              value={form.password}
              onChange={onChange}
              className='w-full border border-gray-200 focus:border-gray-400 rounded-xl px-4 py-3 text-sm outline-none transition'
              placeholder='Leave blank to keep current password'
            />
          </div>

          <div className='flex items-center justify-end gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSaving}
              className='px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition'
            >
              {isSaving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

