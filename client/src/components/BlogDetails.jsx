import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import api from '../Services/api';
import Spinner from 'react-bootstrap/Spinner';

function BlogDetails() {

    const { blog_id } = useParams();
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        const fun = async () => {

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
        <div className="flex justify-center pt-7 pb-80 bg-gray-300">
            <div className=" bg-gray-600 text-white p-8 rounded shadow-md w-2/4 mb-12 flex flex-col gap-14">
                <div className=' underline underline-offset-auto font-serif text-4xl mx-auto '>{title}</div>
                <div className='font-serif text-xl whitespace-pre-wrap'>{content}</div>
                <div className='text-2xl font-serif'>By : {userName}</div>
            </div>
        </div>
    )
}

export default BlogDetails
