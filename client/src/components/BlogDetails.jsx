import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import api from '../Services/api';
import Spinner from 'react-bootstrap/Spinner';
import CommentSection from './CommentSection';
import { useNavigate } from 'react-router-dom';

function BlogDetails() {

    const navigate=useNavigate();
    const { blog_id } = useParams();
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        const fun = async () => {

            if(!localStorage.getItem('token'))
            {
                navigate('/login');
            }
            
            const response = await api.get(`/blog/${blog_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setBlog(response.data.blog);
        }

        fun()
    }, [])

    if (!blog) {
        return <div className='flex h-72 w-screen justify-center items-center'><Spinner animation="border" variant="primary" /></div>
    }

    const { title, content, author } = blog;
    const userName = author ? author.userName : "Unknown";

    return (
        <div className='flex flex-col min-h-screen min-w-screen pt-7 pb-80 bg-gray-300 justify-center items-center'>
            <div className="bg-gray-600 text-white p-8 rounded shadow-md w-2/4 mb-12 flex flex-col justify-center gap-14">
                <div className=' underline underline-offset-auto font-serif text-4xl mx-auto '>{title}</div>
                <div className='font-serif text-xl whitespace-pre-wrap break-all'>{content}</div>
                <div className='text-2xl font-serif'>By : {userName}</div>
            </div>
            <CommentSection blog_id={blog_id} />
        </div>
    )
}

export default BlogDetails
