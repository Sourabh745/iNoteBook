import React,{useContext} from 'react';
import NoteContext from '../context/noted/noteContext';
import '../styles/NoteItem.css'

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNotes } = props;
    return (
        <div className="col-md-3" style={{paddingLeft: '3%'}}>
            <div className = "card my-3 mx-4 card1" >
                    <div className="d-flex align-items-left">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid " style={{cursor: 'pointer'}} onClick={()=> {deleteNote(note._id); props.showAlert("Deleted Successfully","success")}}>🗑️</i>
                        <i className="fa-regular " style={{cursor: 'pointer'}} onClick = {()=> {updateNotes(note)}}>✏️</i>
                    </div>
                    <p className="card-text">{note.description}</p>
            </div>
        </div>
    );
}

export default Noteitem;

