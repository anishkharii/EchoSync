import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = ()=>{
    const [user,setUser] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser).username);
            setEmail(JSON.parse(storedUser).email);
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
            <h3>{email}</h3>
            <button className='log-out-btn' onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Home;