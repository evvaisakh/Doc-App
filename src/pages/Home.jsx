import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import { db } from '../firebase'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [documents, setDocuments] = useState([])
    const [newDocumentTitle, setNewDocumentTitle] = useState("")
    const [reload, setRelaod] = useState('')
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const docsCollectionRef = collection(db, 'documents')

    const getDocument = async () => {
        try {
            const docsData = await getDocs(docsCollectionRef)
            const data = docsData.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ))
            setDocuments(data)
        } catch (error) {
            console.error('Error fetching documents: ', error)
            toast.error('Failed to fetch documents!!!')
        }
    }

    const addDocument = async () => {
        try {
            if (!newDocumentTitle.trim()) {
                toast.error('Please enter a title for the document!!!');
                return;
            }
            await addDoc(docsCollectionRef, {
                title: newDocumentTitle,
                description: ""
            })
            setRelaod(newDocumentTitle)
            toast.success(`Document ${newDocumentTitle} added successfully!!!`);
            handleClose()
        } catch (error) {
            console.error('Error adding document: ', error)
            toast.error('Failed to add document!!!')
        }
    }

    const deleteDocument = async (id) => {
        try {
            const delDoc = doc(db, 'documents', id)
            await deleteDoc(delDoc)
            setRelaod(id)
            toast.success('Document deleted successfully!!!')
        } catch (error) {
            console.error('Error deleting document: ', error)
            toast.error('Failed to delete document!!!')
        }
    }

    useEffect(() => {
        getDocument()
    }, [reload])

    const handleEdit = data => {
        navigate('/quill', { state: data });
    }

    const handleChange = e => {
        setNewDocumentTitle(e.target.value);
    }

    return (
        <>
            <Header />
            <div className='container'>
                <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
                    <button className='btn btn-primary text-light' onClick={handleShow}>
                        <i className="fa-solid fa-circle-plus me-2"></i>
                        Add New Document
                    </button>
                </div>
                <div className="row mt-5">
                    {documents.map(item => (
                        <div key={item.id} className="col-lg-4">
                            <Card style={{ width: '20rem', textAlign: 'justify' }} className='bg-info-subtle shadow'>
                                <Card.Body>
                                    <Card.Title className='fw-bold'>{item.title}</Card.Title>
                                    <Card.Text>
                                        {DOMPurify.sanitize(item.description, { ALLOWED_TAGS: [] })}
                                    </Card.Text>
                                    <div className='d-flex justify-content-end column-gap-2'>
                                        <Button variant="primary" size="sm" onClick={() => handleEdit(item)}><i className="fa-solid fa-pen-to-square"></i></Button>
                                        <Button variant="danger" size="sm" onClick={() => deleteDocument(item.id)}><i className="fa-solid fa-trash"></i></Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Body>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInput"
                                type="text"
                                placeholder="Add Title"
                                onChange={handleChange}
                            />
                            <label htmlFor="floatingInput">Add Title</label>
                        </Form.Floating>
                        <div className='text-center'>
                            <button className='btn btn-primary text-light' onClick={addDocument}>
                                Add
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default Home