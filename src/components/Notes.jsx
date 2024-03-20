import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/noted/noteContext';
import NoteItem from './Noteitem';
import AddNote from './AddNote';
import {useNavigate} from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    let history = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }       
            history("/");
    
    }, []);
      
    const ref = useRef(null); // useRef for showing modals
    const refClose = useRef(null);
    
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""}); // to edit note same as addnotes
    
    const updateNotes = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }
    const handleClick = (e) =>{
        //e.preventDefault(); // to prevent reload when click on add button
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success")
    } 

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value}) // set the change value in title and description into notes .
    }

    return (
        <>
            <AddNote showAlert = {props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: 'none' }}>
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='container my-3'>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                    </div>
                                    {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button> */}
                                </form>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5}  className="btn btn-primary" onClick={handleClick}>Update changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className = "row my-3 mx-3" >
                <h2>Your Notes</h2>
                <div className="container">
                {notes.length === 0 && "Your notes are empty"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNotes={updateNotes} note={note}  showAlert = {props.showAlert} /> // show card
                })}
            </div>
        </>
    );
}

export default Notes;