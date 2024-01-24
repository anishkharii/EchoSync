import React from 'react';
import './App.css';
import LogInForm from './logInForm';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SignUpForm from './signUpform'
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
