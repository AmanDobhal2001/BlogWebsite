import React from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../Services/api';

function EditBlog({}) {

    const {blog_id}=useParams();
    const navigate = useNavigate();
    const [formData, setformData] = useState({ blogImage: null, title: '', content: '',prevBlogImage:'' });
    let prevBlogImage;
    
    useEffect(() => {
      const getBlog=async() => {
        
        const response=await api.get(`/blog/${blog_id}`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
        const data=response.data.blog;
        setformData({ title: data.title, content: data.content, prevBlogImage:data.blogImage });
      }

      getBlog();
    }, [])
  
    function handleChange(e) {
      setformData({ ...formData, [e.target.name]: e.target.value });
    }
  
    function handleBlogImage(e) {
      setformData({ ...formData, blogImage: e.target.files[0] });
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const formDataToSent = new FormData();
        formDataToSent.append('title', formData.title);
        formDataToSent.append('content', formData.content);
        formDataToSent.append('blogImage', formData.blogImage);
        formDataToSent.append('prevBlogImage',formData.prevBlogImage);
        const response = await api.patch(`/blog/MyBlogs/${blog_id}`, formDataToSent, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        navigate(`/BlogDetails/${blog_id}`);
      }
      catch (error) {
          alert("Error updating form");
      }
    }
  
    return (
      <div className="flex items-center text-black justify-center pt-7 pb-20  bg-gray-300">
        <form
          className="bg-white p-8 rounded shadow-md w-2/4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Add Blog</h1>
          <div className="mb-2">
            <label
              htmlFor="BlogImage"
              className="block text-gray-700 font-semibold"
            >
              Blog Image
            </label>
            <input
              type="file"
              accept='image/*'
              id="blogImage"
              onChange={handleBlogImage}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="title" className="block text-gray-700 font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter blog title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="block text-gray-700 font-semibold">
              content
            </label>
            <textarea
              type="text"
              name="content"
              id="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 h-48"
              placeholder="Write something"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      </div>
    )
}

export default EditBlog
