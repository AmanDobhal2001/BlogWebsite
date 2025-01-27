import api from '../Services/api';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ userName: "", email: "", password: "", profileImage: null });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleProfileImage(e) {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  }

  async function handleSubmit(e) {
    try {

      e.preventDefault();
      const formDataToSend = new FormData();
      formDataToSend.append('userName', formData.userName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('profileImage', formData.profileImage);
      const response = await api.post('/auth/signup', formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } });

      localStorage.setItem('token',response.data.token)
      navigate('/');
    }

    catch (error) {
      
      if(error.response)
      {
        alert(error.response.data.error);
      }

    }
  }

  return (
    <div className="flex items-center text-black justify-center pt-7 pb-20  bg-gray-300">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <div className="mb-2">
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Name
          </label>
          <input
            type="text"
            name="userName"
            id="name"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email1" className="block text-gray-700 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email1"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password1"
            className="block text-gray-700 font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password1"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="profileImage"
            className="block text-gray-700 font-semibold"
          >
            Profile Photo
          </label>
          <input
            type="file"
            accept='image/*'
            id="profileImage"
            onChange={handleProfileImage}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600">LogIn</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
