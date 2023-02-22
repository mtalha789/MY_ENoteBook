import React,{useContext} from 'react'
import NoteContext from '../context/notes/notescontext'

export default function Noteitem(props) {
  const context=useContext(NoteContext)
  const {deletenote}=context
  const {note,updatenote}=props;
  const deleten=(id)=>{
    deletenote(id)
    props.showalert('Deleted Note Successfully!','success')
  }


  return (
    <div className="col-md-3">
    <div className="card my-1" >
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa fa-trash-o" aria-hidden="true" onClick={()=>{deleten(note._id)}}></i>
    <i className="fa fa-pencil" aria-hidden="true" onClick={()=>{updatenote(note)}}></i>
    </div>
    <p className="card-text">{note.description}</p>
  </div>
</div>
</div>
  )
}
