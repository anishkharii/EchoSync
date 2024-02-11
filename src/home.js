import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./home.css";

const Home = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      } 
      else {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if(response.status===200){
            const responseData = await response.json();
            setUser(responseData.username);
            setEmail(responseData.email);
          }
          else{
            navigate('/login');
          }

        } catch (error) {
          console.error("Failed to fetch user data", error);
          navigate("/login");
        }
      }
    }
    getUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser("");
    setEmail('');
    navigate("/login");
  };
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
        <h2>{email}</h2>
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
};

export default Home;
