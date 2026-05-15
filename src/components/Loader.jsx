import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onFinish }) {
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    const explodeTimer = setTimeout(() => {
      setExplode(true);
    }, 800); // plus rapide

    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 1200); // maximum 1.2s

    return () => {
      clearTimeout(explodeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05
      }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`loader-logo ${explode ? "explode" : ""}`}
      >
        Bienvenue
      </motion.h1>

      <motion.div
        className="loader-bar"
        initial={{ width: 0 }}
        animate={{ width: "120px" }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}