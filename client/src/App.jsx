import React from 'react'
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Navbar from './components/Navbar';
import AddBlog from './components/AddBlog';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogDetails from './components/BlogDetails';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/addBlog' element={<AddBlog/>}/>
        <Route path='/blogDetails/:blog_id' element={<BlogDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App
