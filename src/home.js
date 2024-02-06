import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet'
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
    return (
      <div className="main">
        <Helmet>
          <title>Home | EchoSync</title>
          <meta
            name="description"
            content="EchoSync, your dynamic chat companion for seamless real-time communication. Stay connected effortlessly, exchange messages, and synchronize conversations with friends, colleagues, or groups. Enjoy a modern chat experience with EchoSync, featuring user-friendly design and features like message synchronization, emojis, and more. Connect instantly and make your conversations come alive with EchoSync, where communication meets synchronization."
          />
        </Helmet>
        <div className="home-content">
          <h1>Welcome, {user}!</h1>
          <h2>
            Thanks for showing your interest. The Development is in Progress.
            Please keep supporting.
          </h2>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    );
}

export default Home;