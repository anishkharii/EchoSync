import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./home.css";
import "../src/Components/MainPage/header.css";
import {
  BellRing,
  Home,
  Mail,
  MessageSquare,
  Search,
  CircleUserIcon,
  User,
} from "lucide-react";

const Main = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [linkActive, setLinkActive] = useState({
    active: true,
    name: "Home",
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        document.querySelector("header").style.top = "-5px";
        document.querySelector("nav").style.bottom = "-5px";
      } else {
        document.querySelector("nav").style.bottom = "0";
        document.querySelector("header").style.top = "0";
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
          setIsLoading(true);
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/user`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsLoading(false);
          if (response.status === 200) {
            const responseData = await response.json();
            setUser(responseData.username);
            setEmail(responseData.email);
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
          alert("Network Error, Please check your connection");
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

        <div className="nav-link">
          <BellRing
            size={25}
            style={{ padding: "8px" }}
            onClick={() =>
              setLinkActive({ active: true, name: "Notifications" })
            }
            className={`nav-link ${
              linkActive.active &&
              linkActive.name === "Notifications" &&
              "active"
            }`}
          />
        </div>
      </header>

      <div className="main-content">
        {isLoading === true && <div className="loading">Loading...</div>}
        {linkActive.name === "Home" && (
          <div>
            <h2>Welcome, {user}</h2>
            <p>
              Development is still in progress. Thanks for showing for interest.
            </p>
          </div>
        )}

        {linkActive.name === "Search" && (
          <div>
            <h2>Search </h2>
            <p>This feature is coming soon in upcoming updates.</p>
          </div>
        )}
        {linkActive.name === "Messages" && (
          <div>
            <h2>Messages </h2>
            <p>This feature is prior. Next Update is coming about it.</p>
          </div>
        )}

        {linkActive.name === "Notifications" && (
          <div>
            <h2>Notifications </h2>
            <p>This is the section where all notifications are coming.</p>
          </div>
        )}
      </div>

      <nav className="main-nav">
        <ul>
          <li
            onClick={() => setLinkActive({ active: true, name: "Home" })}
            className={`nav-link ${
              linkActive.active && linkActive.name === "Home" && "active"
            }`}
          >
            <Home size={28} />
          </li>
          <li
            onClick={() => setLinkActive({ active: true, name: "Search" })}
            className={`nav-link ${
              linkActive.active && linkActive.name === "Search" && "active"
            }`}
          >
            <Search size={28} />
          </li>
          <li
            onClick={() => setLinkActive({ active: true, name: "Messages" })}
            className={`nav-link ${
              linkActive.active && linkActive.name === "Messages" && "active"
            }`}
          >
            <MessageSquare size={28} />
          </li>
          <li
            onClick={() => setLinkActive({ active: true, name: "User" })}
            className={`nav-link ${
              linkActive.active && linkActive.name === "User" && "active"
            }`}
          >
            <User size={28} />
          </li>
        </ul>
      </nav>

      {linkActive.name === "User" && (
        <div className="user-profile">
          <div className="email-view">
            <Mail />
            {email}
          </div>
          <div className="user-view">
            <CircleUserIcon /> {user}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
