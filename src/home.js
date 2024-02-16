import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./home.css";
import '../src/Components/MainPage/header.css';
import {
  BellRing,
  Home,
  MessageSquare,
  Search,
  User,
} from "lucide-react";

const Main = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [linkActive, setLinkActive] = useState({
    active: false,
    name: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        document.querySelector("nav").style.bottom = "-20px";
        document.querySelector('nav').style.opacity='0.5';
      } else {
        document.querySelector("nav").style.bottom = "0";
        document.querySelector('nav').style.opacity='1';
      }
      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      } else {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/user`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            const responseData = await response.json();
            setUser(responseData.username);
            setEmail(responseData.email);
          } else {
            navigate("/login");
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
    setEmail("");
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

      <header>
        <img src="../images/EchoSync-logo.webp" alt="Logo" />
        <div className="search-bar"></div>

        <div className="nav-link"><BellRing size={25} /></div>
      </header>

      <div className="main-content">
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
        {user},{email}
        
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fdfsafkdf kf adsjkhfsd l;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fdfsafkdf kf adsjkhfsd l;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
        <p>dfasl fds as fslfl asdfdsf dsaf sdsdlkkkf dasfdsa fsdfdslnds ;fff ds fl;f; ldsf;</p>
      </div>

      <nav className="main-nav">
        <ul>
          <li onClick={() => setLinkActive({ active: true, name: "Home" })} className={`nav-link ${linkActive.active && linkActive.name === "Home" && "active"}`}>
            <Home size={28}/>
          </li>
          <li onClick={() => setLinkActive({ active: true, name: "Search" })} className={`nav-link ${linkActive.active && linkActive.name === "Search" && "active"}`}>
            <Search size={28}/>
          </li>
          <li onClick={() => setLinkActive({ active: true, name: "MessageSquare" })} className={`nav-link ${linkActive.active && linkActive.name === "MessageSquare" && "active"}`}>
            <MessageSquare size={28}/>
          </li>
          <li onClick={() => setLinkActive({ active: true, name: "User" })} className={`nav-link ${linkActive.active && linkActive.name === "User" && "active"}`}>
            <User size={28}/>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Main;
