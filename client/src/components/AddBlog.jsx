import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api'

function AddBlog() {

  const navigate = useNavigate();
  const [formData, setformData] = useState({ blogImage: null, title: '', content: '' });

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
      const response = await api.post('/blog', formDataToSent, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      navigate('/');
    }
    catch (error) {
      if (error.response) {
        alert("Error uploading file");
      }
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

export default AddBlog
