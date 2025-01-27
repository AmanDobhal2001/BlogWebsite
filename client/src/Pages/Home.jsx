import api from '../Services/api';
import React from 'react';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

function Home() {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await api.get('/blog');
        setBlogs(response.data.blog);
      }
      catch (error) {
        console.log("Error fetching blogs");
      }
    }

    getBlogs();
  }, [])




  return (
    <div className='bg-slate-700 min-h-screen py-2'>
      {blogs.length > 0 ? (
        <div className='grid grid-cols-4 gap-y-7 place-items-center w-4/5 mx-auto py-4 bg-slate-500'>
          {
            blogs.map((blog) => {
              return (
                <Link key={blog._id} to={`/blogDetails/${blog._id}`} className='w-64 no-underline text-inherit'>
                  <img variant="top" className='rounded-t-xl h-44 w-64' src={`http://localhost:5000/uploads/${blog.blogImage}`} />
                  <Card.Body className='bg-slate-400/70 rounded-b-2xl h-24 w-64 flex flex-wrap items-center font-bold'>
                    <p className='font-sans list-none text-gray-200 p-3 pt-2 break-all'>{blog.content.substr(0,70)}...</p>
                  </Card.Body>
                </Link>
              )
            })}
        </div>) : (<div className='flex h-screen w-screen justify-center items-center'><Spinner animation="border" variant="primary" /></div>)}
    </div>
  )
}

export default Home
