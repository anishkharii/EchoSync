import React, { useEffect, useRef } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import axios from 'axios'
import Form from '../src/Components/Forms/form.js'
import Main from './home.js'
function App() {
  const serverEffectRef = useRef(false);

  useEffect(() => {
    const startServer = async () => {
      
      if(!serverEffectRef.current) {
  
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`);
        console.log(response.data);
        serverEffectRef.current = true;
      }
    }
    startServer();
  }, []);

  return(
    <div className='app'>
    <Router >
      <Routes>
        <Route exact path={'/add-user'} element={<Form type='sign-up'/>} />
        <Route exact path='/login' element={<Form type='login'/>} />
        <Route exact path='/forgot-password' element={<Form type='forgot-password'/>}/>
        <Route exact path='/' Component={Main} />
        
      </Routes>
    </Router>
    </div>
  )
}

export default App;
