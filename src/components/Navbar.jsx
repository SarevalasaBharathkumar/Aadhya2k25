import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoLogoReact } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa"; // Import Profile Icon
import { motion, AnimatePresence } from "framer-motion";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile state when window resizes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        <IoLogoReact size={40} className="react-icon" />
        <h1 className="logo-text">ABHIYANTH<span> 2K25</span></h1>
      </div>

      {/* PROFILE ICON (Visible in Mobile) */}
      {isMobile && (
        <div className="profile-icon-mobile">
          <NavLink to="/profile">
            <FaUserCircle size={28} />
          </NavLink>
        </div>
      )}

      {/* MENU BUTTON (Visible only on mobile screens) */}
      {isMobile && (
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={36} className="menu-glow" /> : <HiMenu size={36} className="menu-glow" />}
        </div>
      )}

      {/* NAVIGATION MENU */}
      <AnimatePresence>
        {(isMobile && isOpen) || !isMobile ? (
          <motion.div
            key="nav-menu"
            className={`nav-menu ${isMobile ? "mobile-menu" : ""}`}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ul>
              <li><NavLink to="/page1" onClick={() => setIsOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/page2" onClick={() => setIsOpen(false)}>Clubs</NavLink></li>
              <li><NavLink to="/page3" onClick={() => setIsOpen(false)}>CarrerGuidance</NavLink></li>
              <li><NavLink to="/page4" onClick={() => setIsOpen(false)}>Shedules</NavLink></li>
              <li><NavLink to="/page5" onClick={() => setIsOpen(false)}>Alumni</NavLink></li>

              {/* PROFILE ICON (Only in Desktop) */}
              {!isMobile && (
                <li className="profile-icon">
                  <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                    <FaUserCircle size={28} />
                  </NavLink>
                </li>
              )}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
