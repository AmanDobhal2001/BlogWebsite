import api from '../Services/api';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  async function handleSubmit(e) {
    try {

      e.preventDefault();
      const response = await api.post('/auth/login', formData,{ headers: { 'Content-Type': 'application/json' }});
      localStorage.setItem('token',response.data.token);

      navigate('/');
    }

    catch (error) {
        alert(error.response.data.error);
    }
  }

  return (
    <div className="flex items-center text-black justify-center pt-20 pb-44  bg-gray-300">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
        <div className="mb-4">
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/signup" className="text-blue-600">SignUp</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
