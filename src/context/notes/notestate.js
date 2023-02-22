import { useState } from 'react'
import NoteContext from './notescontext'

const NoteState=(props)=>{

const [notes,setnotes]= useState([]);
const url="http://localhost:5000";

const fetchnotes=async()=>{
  const response = await fetch(`${url}/api/notes/fetchall`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('token')
    }
  });
  const json=await response.json()
  setnotes(json)
}


const addnote=async(title,description,tag)=>{
  const response = await fetch(`${url}/api/notes/addnote`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('token')
    },
  body: JSON.stringify({title,description,tag})
  });
  const json=await response.json()
  setnotes(notes.concat(json))
}

const editnote=async(id,title,description,tag)=>{
  const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('token')
    },
  body: JSON.stringify({title,description,tag})
  });
   await response.json();

   const newnotes=JSON.parse(JSON.stringify(notes))
  //logic to edit in client
  for (let index = 0; index < newnotes.length; index++) {
    const element = newnotes[index];
    if (element._id===id) {
      element.title=title;
      element.description=description;
      element.tag=tag;
      break;
    }
  }
  setnotes(newnotes)
}

const deletenote=async(id)=>{
  const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('token')
    }
  });
  const json=await response.json()
  console.log(json)
  setnotes(notes.filter((note)=>{return note._id !== id}))
  console.log('deleted notte with id:'+id)
}


return(
    <NoteContext.Provider value={{notes,addnote,deletenote,fetchnotes,editnote}}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;