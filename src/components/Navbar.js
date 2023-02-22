import React,{useEffect} from 'react'
import { Link ,useLocation,useNavigate} from 'react-router-dom'

export default function Navbar(props) {
  let location = useLocation();
  useEffect(() => { }, [location]);
  const navigate=useNavigate()

  const handlelogout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
    props.showalert('Logged Out Successfully','success')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">ENoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form action="">
        <Link className="btn btn-primary mx-1" to='/login'  role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to='/signup' role="button">SignUp</Link>
      </form>:
      <button className='btn btn-primary' onClick={handlelogout}>Log Out</button>
  }
    </div>
  </div>
</nav>
    </div>
  )
}

