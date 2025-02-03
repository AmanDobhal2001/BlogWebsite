import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import TranslateWidget from './GoogleTranslate';

function NavScrollExample() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  async function handleLogOut(e) {

    localStorage.removeItem('token');

    navigate('/login');

  }

  return (
    <Navbar expand="lg" className="bg-body-secondary sticky-top">
      <Container fluid>
        <Navbar.Brand className="pl-16 font-serif">
          <Link to="/" className="text-decoration-none text-dark">BlogiFy</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Link to="/" className="nav-link">Home</Link>
            {!token ? (
              <>
                <Link to="/login" className="nav-link">Log In</Link>
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </>
            ) : (
            <>
              <Link to="/addBlog" className="nav-link">Add Blog</Link>
              <Link to="/myBlogs" className="nav-link">My Blogs</Link>
            </>
            )}
            <div className='pt-2 ml-8'><TranslateWidget /></div>
          </Nav>
          {token && (
            <Button onClick={handleLogOut} className="ms-auto btn btn-primary">
              Log out
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;