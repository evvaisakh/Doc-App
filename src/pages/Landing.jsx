import React, { useEffect, useRef, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const toastDisplayed = useRef(false)

    const handleLogin = (e) => {
        e.preventDefault()
        if (username === 'user' && password === 'password') {
            navigate('/home')
            toast.success('Login successful!!!')
        } else {
            toast.error('Invalid username or password!!!')
        }
    }

    useEffect(() => {
        if (!toastDisplayed.current) {
            toast.info(<div>Default username: <strong>user</strong> <br /> Default password: <strong>password</strong></div>);
            toastDisplayed.current = true;
        }
    }, [])

    return (
        <>
            <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center bg-info-subtle'>
                <div className="container w-75">
                    <div className="card shadow p-3 mt-2 mb-5 bg-body-secondary">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <img className='w-100' src="https://cdni.iconscout.com/illustration/premium/thumb/app-login-5188522-4346990.png" alt="Auth" />
                            </div>
                            <div className="col-lg-6">
                                <h1 className='fw-bolder mt-2'>
                                    <i className="fa-brands fa-dochub"></i> <span className='text-warning pe-1'>Docu</span>Verse
                                </h1>
                                <h5 className='fw-bolder mt-2'>
                                    Sign in to your Account
                                </h5>
                                <Form onSubmit={handleLogin}>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Username"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" placeholder="Username" value={username}
                                            onChange={(e) => setUsername(e.target.value)} />
                                    </FloatingLabel>
                                    <FloatingLabel
                                        controlId="floatingPassword"
                                        label="Password"
                                    >
                                        <Form.Control type="password" placeholder="Password" value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </FloatingLabel>
                                    <div className="mt-3">
                                        <button type='submit' className="btn btn-primary mb-2">Login</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing