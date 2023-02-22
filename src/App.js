import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/notestate'
import React, { useState} from 'react'


function App() {

  let  [alert,setalert]=useState(null);
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }

  return (
    <>
    <NoteState>
     <Router>
      <Navbar showalert={showalert}/>
      <Alert alert={alert}/>
      <div className="container my-3">
      <Routes>
      <Route exact path="/" element={<Home showalert={showalert} />}  />
      <Route exact path="/about" element={<About /> } />
      <Route exact path="/login" element={<Login showalert={showalert} />} />
      <Route exact path="/signup" element={<Signup showalert={showalert} />} />
      </Routes>
      </div>
     </Router>
     </NoteState>
    </>
  );
}

export default App;
