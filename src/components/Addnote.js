import React,{useContext,useState} from 'react'
import NoteContext from '../context/notes/notescontext'
import { useNavigate } from 'react-router-dom'

export default function Addnote(props) {
    const context=useContext(NoteContext)
    const {addnote}=context
    let [note,setnote]=useState({title:"",description:"",tag:""})

    const navigate=useNavigate()

    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }

    const handleclickadd=(e)=>{
        const token=localStorage.getItem('token')
        if (token){
        e.preventDefault();
        addnote(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""})
        props.showalert('Added Note Successfully','success')
        }
        else{
          navigate('/login')
        }
    }
  return (
    <div>
      <h2>Add A Note</h2>
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title'minLength={5} value={note.title} onChange={onchange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label" >Description</label>
    <input type="text" className="form-control" id="description" name='description' value={note.description} minLength={5} onChange={onchange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label" >Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange}/>
  </div>
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleclickadd} className="btn btn-primary">ADD NOTE</button>
</form>
    </div>
  )
}
