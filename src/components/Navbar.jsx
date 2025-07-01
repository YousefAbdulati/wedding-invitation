import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay Blur Layer */}
      {isOpen && <div className="overlay-blur" onClick={toggleMenu}></div>}

      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
           Ahmed <span>& Ethar</span>
          </div>

          {/* Hamburger Icon */}
          <div className="menu-icon" onClick={toggleMenu}>
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#time">Date</a></li>
            <li><a href="#photos">Photos</a></li>
            <li><a href="#comments">Comments</a></li>
          </ul>
        </div>
      </nav>
    </>
  );
}
