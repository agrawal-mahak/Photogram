import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import './Navbar.css'

const authLinks = [
  { path: '/', label: 'Home' },
  { path: '/login', label: 'Login' },
  { path: '/register', label: 'Register' },
]

const userLinks = [{ path: '/', label: 'Home' }]

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const renderLinks = (links) =>
    links.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
        end={link.path === '/'}
      >
        {link.label}
      </NavLink>
    ))

  return (
    <nav className='glass-nav'>
      <div className='nav-wrapper'>
        <NavLink to='/' className='brand'>
          <span className='brand-icon'>
            <span className='brand-icon-inner'>PG</span>
          </span>
          <span className='brand-text'>Moments</span>
        </NavLink>

        <div className='nav-items'>
          {user ? (
            <>
              {renderLinks(userLinks)}
              <div className='nav-divider' />
              <span className='welcome-text'>Welcome, {user.username}</span>
              <button type='button' onClick={handleLogout} className='logout-button'>
                Logout
              </button>
            </>
          ) : (
            renderLinks(authLinks)
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar