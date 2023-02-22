import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

export default function Signup(props) {const navigate=useNavigate();

  const [credentials,setcredeentials]=useState({name:"",email:"",password:"",cpassword:""})

  //onchange to change or get value of email / password
  const onChange=(e)=>{
    setcredeentials({...credentials,[e.target.name]:e.target.value})
  }

  //form submission api call
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}=credentials
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({name,email,password})
    });
    const json=await response.json()
    if (json.success) {
      navigate('/login')
      props.showalert('Signed Up Successfully','success')
    }
    else{
      props.showalert('Invalid Credentials','danger')
    }
  }
  return (
    <div className='container'>
      <h2 className='my-2'>Sign Up to use eNoteBook</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp"/>
          </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
          </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
  )
}
