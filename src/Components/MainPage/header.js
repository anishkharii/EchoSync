import { CircleUserRound } from "lucide-react";
import React, { useState } from "react";
import './header.css'

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header>
        <img src="../images/EchoSync-logo.webp" alt="Logo" />
        <div className="search-bar">Search Bar</div>
        <div className="user-area" onClick={toggleMenu}> 
          <CircleUserRound size={35} />
          {props.username}
        </div>
      </header>

      {isMenuOpen && (
        <div className="profile-menu">
          <ul>
            <li>Edit Profile</li>
            <li>Logout</li>
          </ul>
        </div>
      )}
    </>
  )
}
export default Header;
