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
        const response = await fetch('http://localhost:5000/api/blog');
       
        const reader= response.body.getReader();
        const decoder= new TextDecoder();
        let result='';

        while(true)
        {
          const {done,value}= await reader.read();
          if(done)
          {
            break;
          }

          result+=decoder.decode(value,{stream:'true'});
        }

        const blogsData=await JSON.parse(result);
        
        setBlogs(blogsData);
      }
      catch (error) {
        console.log("Error fetching blogs",error);
      }
    }

    getBlogs();
  }, [])




  return (
    <div className='bg-slate-100 min-h-screen py-2'>
      {blogs.length > 0 ? (
        <div className='grid grid-cols-4 gap-y-7 place-items-center w-4/5 mx-auto py-4 bg-white'>
          {
            blogs.map((blog) => {
              return (
                <Link key={blog._id} to={`/blogDetails/${blog._id}`} className='w-64 no-underline text-inherit'>
                  <img variant="top" className='rounded-t-xl h-44 w-64' src={`http://localhost:5000/uploads/${blog.blogImage}`} />
                  <Card.Body className='bg-slate-400 border border-black rounded-b-2xl h-24 w-64 flex flex-wrap items-center font-bold'>
                    <p className='font-sans list-none text-white p-3 pt-2 break-all'>{blog.content.slice(0,70)}...</p>
                  </Card.Body>
                </Link>
              )
            })}
        </div>) : (<div className='flex h-screen w-screen justify-center items-center'><Spinner animation="border" variant="primary" /></div>)}
    </div>
  )
}

export default Home
