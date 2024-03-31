import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    toast.info('Logged out successfully!!!')
  }

  return (
    <>
      <Navbar expand='lg' className="bg-primary shadow">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} className='text-decoration-none fw-bold text-light'><i className="fa-brands fa-dochub fa-flip text-light"></i> <span className='text-warning pe-1'>Docu</span>Verse</Link>
          </Navbar.Brand>
        </Container>
        <div className="ms-auto">
          <button onClick={handleLogout} className="btn btn-link text-light fw-semibold text-decoration-none">Logout<i className="fa-solid fa-right-from-bracket ps-1"></i></button>
        </div>
      </Navbar>
    </>
  )
}

export default Header