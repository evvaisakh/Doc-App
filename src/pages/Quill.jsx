import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

function Quill() {
    const location = useLocation()
    const data = location.state
    const [displayValue, setDisplayValue] = useState(data.description || '')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setDisplayValue(e)
    }
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    }

    useEffect(() => {
        const editDocument = async () => {
            try {
                const oneDoc = doc(db, 'documents', data.id)
                await updateDoc(oneDoc, {
                    description: displayValue
                })
            } catch (error) {
                console.error('Error updating description:', error)
            }
        }

        // Debounce the update or use a save button to avoid unnecessary Firestore updates
        const debounce = setTimeout(() => {
            editDocument()
        }, 1000) // Adjust the debounce time as needed

        return () => clearTimeout(debounce)
    }, [displayValue, data.id])

    return (
        <>
            <div style={{ backgroundImage: 'url("https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/61244/quill-old-paper-clipart-md.png")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
                <div>
                    <button onClick={handleBack} className="btn btn-link text-primary fw-semibold text-decoration-none"><i className="fa-solid fa-circle-chevron-left pe-1"></i>Go Back</button>
                </div>
                <div className="container">
                    <h2 className="fw-semibold">{data.title}</h2>
                    <ReactQuill className='mt-3' style={{ height: '100px' }} placeholder='The Content Starts Here...' theme='snow' value={displayValue} onChange={handleChange} />
                </div>
            </div>
        </>
    )
}

export default Quill