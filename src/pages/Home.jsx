import emailjs from "@emailjs/browser";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaCalendar, FaCheck, FaPhone, FaEnvelope, FaChevronLeft, FaChevronRight, FaArrowUp } from "react-icons/fa";
import { useRef, useEffect, useState, useCallback } from "react";
import PageTransition from "../components/PageTransition";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Typewriter from "../components/Typewriter";
import { Link } from "react-router-dom";
import "../index.css";
import projects from "../data/projects";

function CertLightbox({ img, title, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox-content"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lightbox-close" onClick={onClose}>✕</button>
        <img src={img} alt={title} className="lightbox-img" />
        <p className="lightbox-title">{title}</p>
      </motion.div>
    </motion.div>
  );
}

// SKILL CARD
function SkillCard({ skill, index, isInView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) { setCount(0); return; }
    const delay = index * 200;
    const duration = 1200;
    const steps = 60;
    const increment = skill.level / steps;
    let step = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        setCount(Math.min(Math.round(increment * step), skill.level));
        if (step >= steps) clearInterval(interval);
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, skill.level, index]);

  return (
    <motion.div
      className="logo-skills"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <img src={skill.src} alt={skill.alt} loading="lazy" className={`float ${skill.float}`} />
      <p className="skill-label">{skill.alt}</p>
      <div className="progress-bar-track">
        <motion.div
          className="progress-bar-fill"
          style={{ background: skill.gradient }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${skill.level}%` } : { width: "0%" }}
          transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
        >
          <span className="skill-percent-inside">{count}%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// BACK TO TOP BUTTON
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// SCROLL PROGRESS BAR
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-progress-track">
      <motion.div
        className="scroll-progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// COMPOSANT PRINCIPAL HOME
function Home() {
  const rowRef        = useRef(null);
  const formRef       = useRef(null);
  const skillsRef     = useRef(null);
  const [sending, setSending]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

// PORTFOLIO SLIDER — adaptatif automatique

  // --- LOGIQUE DU SLIDER ADAPTATIF ---
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1 carte sur mobile, 2 sur PC
  const visibleCards = windowWidth <= 768 ? 1 : 2; 
  const maxIndex = Math.max(projects.length - visibleCards, 0);

  // Calcul du déplacement en %
  const getTranslateX = () => {
    if (windowWidth <= 768) {
      // Sur mobile : on décale de 85% (taille carte) + gap
      return `calc(-${currentIndex} * (84% + 17px))`;
    } else {
      // Sur PC : on décale de 45% (taille carte) + gap
      return `calc(-${currentIndex} * (45% + 30px))`;
    }
  };
  // Fonction pour calculer le décalage exact en pourcentage
  // (100% / nombre de cartes visibles) permet de toujours tomber juste
  // Corrige automatiquement l'index si
  // le nombre de projets change
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const skillsInView = useInView(skillsRef, {
    once: false,
    amount: 0.4,
  });

  const skills = [
    { src: "/image/id.webp",  alt: "InDesign",      float: "float1", level: 60, gradient: "linear-gradient(90deg, #5a363bff, #f50a59ff)" },
    { src: "/image/ps.webp",  alt: "Photoshop",     float: "float2", level: 70, gradient: "linear-gradient(90deg, #0b0f48ff, #25c5f2ff)" },
    { src: "/image/ae.webp",  alt: "After Effects", float: "float3", level: 50, gradient: "linear-gradient(90deg, #25175bff, #5d82d7ff)" },
    { src: "/image/ai.webp",  alt: "Illustrator",   float: "float4", level: 50, gradient: "linear-gradient(90deg, #532c0aff, #faad32ff)" },
    { src: "/image/pr.webp",   alt: "Premiere Pro",  float: "float2", level: 70, gradient: "linear-gradient(90deg, #041c50ff, #5d82d7ff)" },
  ];

  const certifications = [
    { img: "/image/Cert_4.webp", title: "Diplôme de licence",organisme: "Communication",    description: "Communication Audiovisuelle et Numérique.", date: "12 Décembre 2024" },
    { img: "/image/cert_1.webp", title: "Attestation d'aptitude professionnelle", organisme: "Vidéaste",    description: "Vidéaste et cadreur.", date: "10 Mai 2023" },
    { img: "/image/cert_2.webp", title: "Cértificat de réussite",   organisme: "Montage", description: "Montage vidéo.",   date: "08 Décembre 2024" },
    { img: "/image/Cert_3.webp", title: "Cértificat de réussite", organisme: "Infographie",    description: "Infographie.",   date: "08 Décembre 2024" }
  ];

  const prev = useCallback(() => setCurrentIndex(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrentIndex(i => Math.min(maxIndex, i + 1)), [maxIndex]);

  // Navigation clavier
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Drag / swipe sur le slider
  useEffect(() => {
    const track = rowRef.current;
    if (!track) return;

    let startX = 0;
    let startY = 0;
    let hasMoved = false; // clé du fix

    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      startX = e.clientX;
      startY = e.clientY;
      hasMoved = false;
      // PAS de setPointerCapture ici → le Link peut recevoir le clic
    };

    const onPointerMove = (e) => {
      const dx = Math.abs(e.clientX - startX);
      const dy = Math.abs(e.clientY - startY);

      // On considère un drag seulement si mouvement horizontal > 8px
      // ET plus horizontal que vertical
      if (dx > 8 && dx > dy) {
        hasMoved = true;
      }
    };

    const onPointerUp = (e) => {
      if (!hasMoved) return; // si pas de drag → laisse le Link agir normalement

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Ignore si c'était un scroll vertical
      if (Math.abs(dy) > Math.abs(dx)) return;

      if (dx < -50) next();
      if (dx >  50) prev();

      hasMoved = false;
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup",   onPointerUp);
    track.addEventListener("pointercancel", () => { hasMoved = false; });

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup",   onPointerUp);
    };
  }, [next, prev]);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(
      () => {
        setSending(false);
        setSuccess(true);
        formRef.current.reset();
      },
      (error) => {
        setSending(false);
        alert("Erreur: " + error.text);
      }
    );
  };

  return (
    <>
      <ScrollProgress />
      <BackToTop />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <PageTransition>

          {/* ===== HERO ===== */}
          <section className="hero" id="home-section">
            <motion.div className="hero-content"
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="hero-left">
                <h1 className="typewriter">
                  <Typewriter text="Graphique designer & Vidéaste" speed={100} />
                </h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}>
                  Créatif polyvalent, passioné par l'image et le design. J'aime raconter des histoires à travers des visuels percutants et modernes.
                </motion.p>
                <div className="hero-button">
                  <motion.a className="hero-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => document.querySelector("#portfolio-section").scrollIntoView({ behavior: "smooth" })}>
                    Voir le portfolio
                  </motion.a>
                  <a href="/CV/cv_patrick _cadreur_monteur.pdf" download className="cv-btn">Télécharger mon CV</a>
                </div>
              </div>
              <div className="hero-right">
                <div className="image-glow"></div>
                <img src="../image/holding.webp" alt="sary home" loading="lazy" className="image-home" />
              </div>
            </motion.div>
            <div className="wave wave1">
              <svg viewBox="0 0 1440 320">
                <defs><linearGradient id="wg1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#f4f4f7" /></linearGradient></defs>
                <path fill="url(#wg1)" d="M0,224L80,202.7C160,181,320,139,480,138.7C640,139,800,181,960,202.7C1120,224,1280,224,1360,224L1440,224L1440,320L0,320Z" />
              </svg>
            </div>
            <div className="wave wave2">
              <svg viewBox="0 0 1440 320">
                <defs><linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FF6F004D" /><stop offset="100%" stopColor="#5A0EA333" /></linearGradient></defs>
                <path fill="url(#wg2)" d="M0,256L80,240C160,224,320,192,480,186.7C640,181,800,203,960,224C1120,245,1280,267,1360,277.3L1440,288L1440,320L0,320Z" />
              </svg>
            </div>
          </section>

          {/* ===== SERVICES ===== */}
          <section id="service-section" className="service">
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.6 }}>
              Services
            </motion.h2>
            <div className="service-about">
              {[
                {
                  title: "Production vidéo",
                  img: "../image/video.webp",
                  desc: "Création de contenus vidéo professionnels, du tournage au montage final avec des effets visuels percutants."
                },
                {
                  title: "Conception graphique",
                  img: "../image/graphe.webp",
                  desc: "Design d'identités visuelles, affiches, flyers et supports de communication adaptés à votre marque."
                },
                {
                  title: "Community Manager",
                  img: "../image/sary_12.webp",
                  desc: "Création de contenus ciblés et modération pour booster votre visibilité en ligne et valoriser votre image de marque."
                }
                ].map((s, i) => (
    <motion.div className="child-service" key={i}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: false, amount: 0.4 }}
    >
      <div className="figure-service">
        {/*  Chaque service a son propre image */}
        <img src={s.img} alt={s.title} loading="lazy" className="logo-video" />
      </div>
      <div className="text-service">
        <div className="title-child-service"><h4>{s.title}</h4></div>
        {/*  Chaque service a sa propre description */}
        <div className="para-child-service">{s.desc}</div>
      </div>
    </motion.div>
              ))}
            </div>
          </section>

          {/* ===== PORTFOLIO ===== */}
          <section id="portfolio-section">
            <motion.div className="portfolio-preview">
              <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.6 }}>
                Réalisations
              </motion.h2>

                {/* Slider container */}
                <div className="portfolio-slider-container">

      {/* Bouton précédent */}
      <motion.button
        className={`slider-btn slider-btn--prev ${currentIndex === 0 ? "slider-btn--disabled" : ""}`}
        onClick={(e) => { e.stopPropagation(); prev(); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentIndex === 0}
      >
        <FaChevronLeft />
      </motion.button>

      {/* Track glissant */}
      <div className="portfolio-wrapper" style={{ overflow: "hidden", width: "100%" }}>
        <div
          ref={rowRef}
          className="portfolio-track-new"
          style={{ 
            transform: `translateX(${getTranslateX()})`, // On utilise le nouveau calcul
            display: "flex",
            gap: "30px", // C'est ici qu'on crée l'espace réel
            transition: "transform 0.5s ease-out"
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`portfolio-card ${index === currentIndex ? "portfolio-card--active" : ""}`}
              style={{ 
                // Sur PC on met 45% au lieu de 50% pour créer un vide visuel
                flex: `0 0 ${windowWidth <= 768 ? "85%" : "45%"}`, 
                minWidth: `${windowWidth <= 768 ? "85%" : "45%"}`,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link to={`/project/${project.id}`}>
                <img
                  src={project.projects?.[0]?.cover || project.cover}
                  alt={project.title}
                  loading="lazy"
                />
                <div className="overlay">
                  <h3>{project.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bouton suivant */}
      <motion.button
        className={`slider-btn slider-btn--next ${currentIndex >= maxIndex ? "slider-btn--disabled" : ""}`}
        onClick={(e) => { e.stopPropagation(); next(); }} 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentIndex >= maxIndex}
      >
        <FaChevronRight />
      </motion.button>
                </div>

                {/* Dots de navigation */}
                <div className="slider-dots">
      {projects.map((_, i) => (
        <motion.button
          key={i}
          className={`slider-dot ${i === currentIndex ? "slider-dot--active" : ""}`}
          onClick={() => setCurrentIndex(i)}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Projet ${i + 1}`}
        />
      ))}
                </div>

                {/* Compteur */}
                <p className="slider-counter">
                  <span>{currentIndex + 1}</span> / {projects.length}
                </p>
            </motion.div>
          </section>


          {/* ===== SKILLS ===== */}
          <section id="section-skills" className="skills" ref={skillsRef}>
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.6 }}>
              Compétences
            </motion.h2>
            <div className="logo-flex-skills">
              {skills.map((skill, i) => (
                <SkillCard key={i} skill={skill} index={i} isInView={skillsInView} />
              ))}
            </div>
          </section>

          {/* ===== CERTIFICATIONS ===== */}
          <section id="certification-section" className="certifier">
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.6 }}>
              Certifications
            </motion.h2>
            <div className="flex-certifier">
              {certifications.map((cert, i) => (
                <motion.div className="cert-card" key={i}
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: false, amount: 0.3 }}
                >
                  <div className="cert-img-wrapper"
                    onClick={() => setLightbox({ img: cert.img, title: cert.title })}>
                    <img src={cert.img} alt={cert.title} loading="lazy" className="cert-img" />
                    <div className="cert-badge">{cert.organisme}</div>
                    <div className="cert-zoom-hint">Voir</div>
                  </div>
                  <div className="cert-info">
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-desc">{cert.description}</p>
                    <div className="cert-footer">
                      <span className="cert-date"><FaCalendar /> {cert.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <AnimatePresence>
              {lightbox && (
                <CertLightbox img={lightbox.img} title={lightbox.title} onClose={() => setLightbox(null)} />
              )}
            </AnimatePresence>
          </section>

          {/* ===== ABOUT ===== */}
          <section id="about-section" className="about">
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.6 }}>
              À propos
            </motion.h2>
            <div className="about-container">
              {[{ titre: "Communication audiovisuelle", descri: "Formation axée sur la production audiovisuelle, le montage vidéo, la photographie, le graphisme et la communication digitale.",year: "2021" }, 
                { titre: "Prestations Evénementielle", descri: "Participation de reportages photo et vidéo pour divers évènements (mariages, fiançailles, communions, anniversaires). Prise de vue aérienne par drone, montage vidéo et retouche photo pour des rendus professionnels et émotionnels. ", year: "2022" }, 
                {titre: "Stage vidéaste Photographe", descri: "Participation au tournage de clips et d'émission TV sur le fond vert, initiation aux téchniques de prise de vue, éclairage et de montage vidéo. Développement des compétences pratiques en production audiovisuelle.", year: "2023" }, 
                { titre: "Infographiste", descri: "Création de supports visuels pour les différentes entités du groupe (Beauty institute, université GSI, Américan christian school, amazing grace travel). Réalisation de vidéos promotionnelles et reportages photo d'évènements. Contribution à l'identité visuelle et à la communication digitale des marques partenaires.", year: "2025" }].map((item, i) => (
                <div className="timeline-item" style={{ "--i": i + 1 }} key={i}>
                  <div className="timeline-content">
                    <div className="anne">{item.year}</div>
                    <h3>{item.titre}</h3>
                    <p>{item.descri}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===== CONTACT ===== */}
          <section id="contact-section" className="contact">
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.6 }}>
              Contacter-moi
            </motion.h2>
            <p>Un projet en tête ? Discutons-en et créons quelque chose d'impactant.</p>
            <div className="contact-container">
              <div className="contact-left">
                <form ref={formRef} onSubmit={sendEmail} className="contact-form reveal">
                  <div><label>Veuillez entrer votre nom</label><br /><input type="text" name="user_name" placeholder="Votre nom" required /></div>
                  <div><label>Veuillez entrer votre email</label><br /><input type="email" name="user_email" placeholder="Votre email" required /></div>
                  <div><label>Veuillez entrer votre message</label><br /><textarea name="message" placeholder="Votre message" rows="5" required></textarea></div>
                  <button type="submit" className="btn-form" disabled={sending}>{sending ? "Envoi..." : "Envoyer"}</button>
                  {success && <p className="success-msg">Message envoyé avec succès <FaCheck  className="success-icon-round" /></p>}
                </form>
              </div>
              <div className="contact-right floating">
                <div className="image-glow"></div>
                <img src="../image/young.webp" alt="illustration" loading="lazy" className="img-form" />
              </div>
            </div>
          </section>

          {/* ===== FOOTER ===== */}
          <footer>
            <div className="footer-wave">
              <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                <defs><linearGradient id="fg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#f4f4f7" /></linearGradient></defs>
                <path fill="url(#fg)" d="M0,224L80,202.7C160,181,320,139,480,138.7C640,139,800,181,960,202.7C1120,224,1280,224,1360,224L1440,224L1440,320L0,320Z" />
              </svg>
            </div>
            <div className="flex-footer">
              <div className="child-footer">
                <h3>Liens rapides</h3>
                <ul>
                  {["home-section", "service-section", "portfolio-section", "about-section", "contact-section"].map((id, i) => (
                    <li key={i}>
                      <a href={`#${id}`}>
                        {["Accueil", "Services", "Réalisations", "À propos", "Contact"][i]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="child-footer">
                <h3>Réseaux sociaux</h3>
                <div className="social-icons">
                  <a href="https://www.facebook.com/pa.trick.316013" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </a>
                  <a href="https://www.instagram.com/son_identifiant" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href="https://www.linkedin.com/in/pa-trick-bb58a4371/" aria-label="Linkedin" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
              <div className="child-footer">
                <h3>Contacter</h3>
                <ul className="contact-list">
                  <li>
                    <a href="tel:+261387496133">
                      <FaPhone className="contact-icon" /> Téléphone
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/261387496133" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="contact-icon" /> Whatsapp
                    </a>
                  </li>
                  <li>
                    <a href="mailto:heriniaina.patrick24@gmail.com">
                      <FaEnvelope className="contact-icon" /> Email: heriniaina.patrick24@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            <p className="title-end">&copy; 2026 Heriniaina Patrick - tout droit réservés.</p>
          </footer>

        </PageTransition>
      </motion.div>
    </>
  );
}

export default Home;