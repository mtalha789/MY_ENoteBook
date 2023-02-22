import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
  // to navigate in react router
  const navigate=useNavigate();
  
  const [credentials,setcredeentials]=useState({email:"",password:""})

  //onchange to change or get value of email / password

  const onChange=(e)=>{
    setcredeentials({...credentials,[e.target.name]:e.target.value})
  }

  //form submission api call

  const handlesubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json=await response.json()
    if (json.success) {
      localStorage.setItem('token',json.authenticetion)
      props.showalert('Logged In Successfully','success')
      navigate('/')
    }
    else{
      // navigate('/signup')
      props.showalert('Invalid credentials','danger')
      
    }
  }
  return (
    <div className='container'>
      <h2 className='my-2'>Login to eNoteBook</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
