import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuVariants = {
    closed: {
      clipPath: "circle(0px at calc(100% - 40px) 40px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      clipPath: "circle(1500px at calc(100% - 40px) 40px)",
      transition: {
        type: "spring",
        stiffness: 40
      }
    }
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 40
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
      duration: 0.5
      }
    }
  };

  const links = [
    { name: "Accueil", id: "home-section" },
    { name: "Services", id: "service-section" },
    { name: "Réalisations", id: "portfolio-section" },
    { name: "À propos", id: "about-section" },
    { name: "Contact", id: "contact-section" }
  ];

  const [active, setActive] = useState("Home");

  const handleNavClick = (id, name) => {

    setActive(name);

    // si on est déjà sur la page Home
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    // si on est dans une page projet
    else {

      navigate("/");

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);

    }
  };
  
  useEffect(() => {

  const sections = links.map(link =>
    document.getElementById(link.id)
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const current = links.find(
            link => link.id === entry.target.id
          );

          if (current) {
            setActive(current.name);
          }

        }

      });

    },
    {
      threshold: 0.6
    }
  );

  sections.forEach(section => {
    if (section) observer.observe(section);
  });

  return () => {
    sections.forEach(section => {
      if (section) observer.unobserve(section);
    });
  };

  }, []);

  return (
  <>
  
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >

      <div className="logo">
        <a onClick={() => handleNavClick("home-section","Home")}>
          RANDRIATSIMAMETRA H.Patrick
        </a>
      </div>

      <div 
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.name}>
            <a
              onClick={() => {
                handleNavClick(link.id, link.name);
                setMenuOpen(false);
              }}
              className={active === link.name ? "active" : ""}
            >
              {link.name}

              {active === link.name && (
                <motion.div
                  layoutId="underline"
                  className="underline"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}

            </a>
          </li>
        ))}
      </ul>

    </motion.nav>

    <motion.div
      className="mobile-menu"
      variants={menuVariants}
      initial="closed"
      animate={menuOpen ? "open" : "closed"}
    >
      <motion.ul
    initial="closed"
    animate={menuOpen ? "open" : "closed"}
  >

    {links.map((link) => (

      <motion.li
        key={link.name}
        variants={linkVariants}
      >

        <a
          onClick={()=>{
            handleNavClick(link.id,link.name);
            setMenuOpen(false);
          }}
        >
          {link.name}
        </a>

      </motion.li>

    ))}

      </motion.ul>
    </motion.div>

  </>
  );
}

export default Navbar;