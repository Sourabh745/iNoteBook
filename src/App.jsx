// import React, { useState } from 'react'
// import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
// import NavBar from './components/NavBar';
// import Home from './components/Home';
// import About from './components/About';
// import NoteState from './context/noted/NoteState';
// import Alert from './components/Alert';
// import Login from './components/Login';
// import Signup from './components/Signup';


// function App() {

//   const [alert, setAlert] = useState(null);
//   const location = useLocation();

//   const showAlert = (message, type) => {
//     setAlert({
//       msg: message,
//       type: type
//     }) 
//     setTimeout(() => {
//       setAlert(null);
//     }, 2000);
//   }

//   return ( 
//       <NoteState>
//       <BrowserRouter>
//         {/* <NavBar/> */}
//         {location.pathname !== '/login' && location.pathname !== '/signup' && <NavBar />}
//         <Alert alert={alert}/>
//         <Routes>
//           <Route exact path = "/" element={<Home showAlert={showAlert}/>}/>
//           <Route exact path = "/about" element={<About/>}/>
//           <Route exact path = "/login" element={<Login showAlert={showAlert}/>}/>
//           <Route exact path = "/signup" element={<Signup showAlert={showAlert}/>}/>
//         </Routes>
//       </BrowserRouter>
//       </NoteState>
//   )
// }

// export default App;

///MOUNTING : when a component is shows in screen | UNMOUNTING : vice-versa

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/noted/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css'; // Import the CSS file

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <NoteState>
      <BrowserRouter>
        <div className="app-container"> {/* Apply the CSS class here */}
          <Routes>
            <Route path="*" element={
              <RouteHandler showAlert={showAlert} alert={alert} />
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

const RouteHandler = ({ showAlert, alert }) => {
  const location = useLocation();
  
  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <NavBar />}
      <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login showAlert={showAlert} />} />
        <Route path="/signup" element={<Signup showAlert={showAlert} />} />
      </Routes>
    </>
  );
};

export default App;
