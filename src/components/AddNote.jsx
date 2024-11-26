import React, {useState, useContext} from 'react';
import NoteContext from '../context/noted/noteContext';
import '../styles/NoteItem.css'


const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:""});

    const handleClick = (e) =>{
        e.preventDefault(); // to prevent reload when click on add button
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
        props.showAlert("Added Successfully", "success")
    } 

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value}) // set the change value in title and description into notes .
    }

  return (
    <div className='container my-3'>
      <h1><center>ADD NOTES </center></h1>
      <form>
        <div className="mb-3"  style={{backgroundColor: 'transparent'}}>      
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title}  onChange={onChange} />
        </div>  
        <div className="mb-3"  style={{backgroundColor: 'transparent'}}>
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}  />
        </div>
        <div className="mb-3"  style={{backgroundColor: 'transparent'}}>
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag}  onChange={onChange} />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick }>Add Note</button>
      </form>
     
    </div>
  );
}

export default AddNote;
