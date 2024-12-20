import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";


const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "",password: ""});
  let history = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})  
    });
    const json = await response.json();
    console.log(json);

    if(json.success){
      // Save the authtoken and redirect
      localStorage.setItem('token', json.jwtData);
      props.showAlert("Logged in Successfully", "Success")
      history("/");
    }
    else{
      props.showAlert("Invalid credentials", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value}) // set the change value in title and description into notes .
}

  return (
    <div className='login-container'>
    <div className="container">
      <h2>login to continued to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
