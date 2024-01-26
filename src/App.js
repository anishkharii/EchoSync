import React from 'react';
import './App.css';
import LogInForm from './LogInForm/logInForm.js';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SignUpForm from './SignUpForm/signUpform'
import Home from './home.js'
function App() {
  return(
    <div className='app'>
    <Router>
      <Routes>
        <Route path='/add-user' Component={SignUpForm} />
        <Route path='/login' Component={LogInForm} />
        <Route path='/' Component={Home} />
      </Routes>
    </Router>
    </div>
  )
}

export default App;
