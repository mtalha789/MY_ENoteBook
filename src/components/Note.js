import React,{useContext,useEffect,useRef,useState} from 'react'
import NoteContext from '../context/notes/notescontext'
import Addnote from './Addnote'
import Noteitem from './Noteitem'
import { useNavigate } from 'react-router-dom'

export default function Note(props) {
    const context=useContext(NoteContext)
    const {notes,fetchnotes,editnote}=context

    const navigate=useNavigate()

    const ref=useRef(null)
    const refedit=useRef(null)
    useEffect(()=>{
      if (localStorage.getItem('token')) {
      fetchnotes()
      }
      else{
        navigate('/login')
      }
    },[])

    let [enote,setenote]=useState({id:"",etitle:"",edescription:"",etag:""})

    const onchange=(e)=>{
      setenote({...enote,[e.target.name]:e.target.value})

  }

  const handleclickupdate=(e)=>{
    if(localStorage.getItem('token')){
    console.log('updating note ')
    editnote(enote.id,enote.etitle,enote.edescription,enote.etag)
    refedit.current.click();
    props.showalert('Updated Note Successfully','success')
    }
  }

    //update note

    const updatenote=(currentnote)=>{
      ref.current.click();
      setenote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    }

  return (
    <>
    <Addnote showalert={props.showalert}/>
    
    <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>


  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name='etitle' value={enote.etitle}  minLength={5} required onChange={onchange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" >Description</label>
            <input type="text" className="form-control" id="edescription" name='edescription' minLength={5} required value={enote.edescription} onChange={onchange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" >Tag</label>
            <input type="text" className="form-control" id="etag" name='etag' value={enote.etag} onChange={onchange}/>
          </div>
        </form>
        </div>
        <div className="modal-footer">
          <button type="button" ref={refedit} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" disabled={enote.etitle.length<5 || enote.edescription.length<5}  onClick={handleclickupdate} className="btn btn-primary">Edit Note</button>
        </div>
      </div>
    </div>
  </div>
    <div className='row'>
      {notes.map((note)=>{
        return <Noteitem note={note} key={note._id} updatenote={updatenote} showalert={props.showalert} />
      })}
    </div>
    </>
  )
}
