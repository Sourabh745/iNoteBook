import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/noted/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    }) 
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return ( 
      <NoteState>
      <BrowserRouter>
        <NavBar/>
        <Alert alert={alert}/>
        <Routes>
          <Route exact path = "/" element={<Home showAlert={showAlert}/>}/>
          <Route exact path = "/about" element={<About/>}/>
          <Route exact path = "/login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path = "/signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
      </BrowserRouter>
      </NoteState>
  )
}

export default App;
