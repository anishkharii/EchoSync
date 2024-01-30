import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Form from '../src/Components/Forms/form.js'
import Home from './home.js'
function App() {
  return(
    <div className='app'>
    <Router>
      <Routes>
        <Route path='/add-user' element={<Form type='sign-up'/>} />
        <Route path='/login' element={<Form type='login'/>} />
        <Route path='/forgot-password' element={<Form type='forgot-password'/>}/>
        <Route path='/' Component={Home} />
      </Routes>
    </Router>
    </div>
  )
}

export default App;
