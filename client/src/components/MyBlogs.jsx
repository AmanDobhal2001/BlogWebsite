import React from 'react';
import api from '../Services/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Tooltip } from 'react-tooltip';

function MyBlogs() {

  const [MyBlogs, setMyBlogs] = useState([]);

  useEffect(() => { 
    const getMyBlogs = async () => {

      try {
        const response = await api.get('/blog/MyBlogs', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

        const reader=response.body.getReader();;
        const decoder=new TextDecoder();

        let result='';

        while(true)
        {
          const {done,value}=await reader.read();

          if(done)
          {
            break;
          }

          result+=decoder.decode(value,{stream:true});
        }

        const data=await JSON.parse(result);

        setMyBlogs(data);
      }

      catch (error) {
        console.log('Internal server error');
      }
    }
    getMyBlogs();
  }, [])


  const handleDelete = async (e) => {
    const blogId = e.currentTarget.name;
  
    try {
      await api.delete(`/blog/MyBlogs/${blogId}`, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
      });
      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      setTimeout(() => {
        alert("Blog deleted successfully!");
      }, 500);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not delete blog!");
    }
  };


  return (
    <div className='bg-slate-100 min-h-screen py-2'>
      {MyBlogs.length > 0 ? (
        <div className='grid grid-cols-4 gap-y-7 place-items-center w-4/5 mx-auto py-4 bg-slate-200'>
          {
            MyBlogs.map((blog) => {
              return (
                <div key={blog._id} className='relative'>
                  <Link to={`/blogDetails/${blog._id}`} className='relative w-64 no-underline text-inherit hover:opacity-70'>
                    <img variant="top" className='rounded-t-xl h-44 w-64' src={`http://localhost:5000/uploads/${blog.blogImage}`} />
                    <Card.Body className='bg-slate-400/70 rounded-b-2xl h-24 w-64 flex flex-wrap items-center font-bold'>
                      <p className='font-sans list-none text-gray-200 p-3 pt-2 break-all'>{blog.content.slice(0, 70)}...</p>
                    </Card.Body>
                  </Link>
                  <button data-tooltip-id='delete' className='absolute top-2 right-2 text-3xl bg-slate-400 rounded-full' name={blog._id} onClick={handleDelete}><MdDelete className='text-lg hover:text-2xl text-white m-0.5' /></button>

                  <Tooltip id='delete' place='right' className='bg-white text-black'>
                    delete
                  </Tooltip>

                  <Link to={`/editBlog/${blog._id}`} data-tooltip-id='edit' className='absolute top-10 right-2 bg-slate-400 rounded-full' name={blog._id}><MdModeEdit className='text-lg hover:text-2xl text-white m-0.5' /></Link>

                  <Tooltip id='edit' place='right' className='bg-white text-black'>
                    edit
                  </Tooltip>
                </div>
              )
            })}
        </div>) : (<div className='flex justify-center items-center'>No Blogs Yet</div>)}
    </div>
  )
}

export default MyBlogs;
