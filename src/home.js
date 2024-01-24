import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = ()=>{
    const [user,setUser] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
        else{
            navigate('/login');
        }
    },[navigate]);

    const handleLogout = ()=>{
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }
    return(
        <div className='main'>
            <h1>Welcome, {user}!</h1>
            <button className='btn' onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Home;