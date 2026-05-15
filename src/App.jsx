import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState, useRef } from "react";
import Loader from "./components/Loader.jsx";
import { useLocation, Routes, Route } from "react-router-dom";
import ProjectDetails from "./pages/ProjectDetails.jsx";

function AnimatedRoutes(){
  const location = useLocation();

  return(
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);

  // Loader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Lenis — INITIALISÉ UNE SEULE FOIS
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      gestureOrientation: "vertical",
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
  <>
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <div key="app">
          <div className="mesh-background"></div>
          <Navbar />
          <AnimatedRoutes />
        </div>
      )}
    </AnimatePresence>
  </>
);
}

export default App;