import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../data/projects";

function ProjectDetails() {

  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="project-page">
        <h2>Projet introuvable</h2>
      </div>
    );
  }

  return (
    <div className="project-page">

      {/* BACK */}
      <Link to="/" className="back-btn">
        ← Retour à l'accueil
      </Link>

      {/* HERO */}
      <section className="project-hero">

        <motion.img
          src={
            project.cover ||
            project.sections?.[0]?.media?.[0]?.src
          }
          alt={project.title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="hero-text">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>

      </section>

      {/* ========================= */}
      {/* PROJET AVEC SECTIONS */}
      {/* ========================= */}

      {project.sections ? (

        project.sections.map((section, sectionIndex) => (

          <section
            className="project-section-wrapper"
            key={sectionIndex}
          >

            {/* TITLE */}
            <section className="project-section">

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {section.title}
              </motion.h2>

              <p>{section.description}</p>

            </section>

            {/* MEDIA */}
            <section className="project-media">

              {section.media.map((item, index) => {

                // IMAGE
                if (item.type === "image") {
                  return (
                    <motion.img
                      key={index}
                      src={item.src}
                      alt={section.title}
                      className="project-image"
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                    />
                  );
                }

                // VIDEO
                if (item.type === "video") {
                  return (
                    <motion.video
                      key={index}
                      controls
                      className="project-video"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    >
                      <source src={item.src} type="video/mp4" />
                    </motion.video>
                  );
                }

                return null;

              })}

            </section>

            {/* TOOLS */}
            {section.tools && (
              <section className="project-section">

                <h3>Outils utilisés</h3>

                <div className="tools">
                  {section.tools.map((tool, index) => (
                    <span key={index}>{tool}</span>
                  ))}
                </div>

              </section>
            )}

          </section>

        ))

      ) : (

        <>
          {/* ========================= */}
          {/* PROJET SIMPLE */}
          {/* ========================= */}

          <section className="project-section">

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Concept
            </motion.h2>

            <p>
              Ce projet a été conçu pour explorer une direction visuelle moderne
              et minimaliste. L’objectif était de créer une identité visuelle
              forte et reconnaissable.
            </p>

          </section>

          {/* MEDIA */}
          <section className="project-media">

            {project.media.map((item, index) => {

              // IMAGE
              if (item.type === "image") {
                return (
                  <motion.img
                    key={index}
                    src={item.src}
                    alt={project.title}
                    className="project-image"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  />
                );
              }

              // VIDEO
              if (item.type === "video") {
                return (
                  <motion.video
                    key={index}
                    controls
                    className="project-video"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    <source src={item.src} type="video/mp4" />
                  </motion.video>
                );
              }

              return null;

            })}

          </section>

          {/* TOOLS */}
          {project.tools && (
            <section className="project-section">

              <h3>Outils utilisés</h3>

              <div className="tools">
                {project.tools.map((tool, index) => (
                  <span key={index}>{tool}</span>
                ))}
              </div>

            </section>
          )}

        </>

      )}
    </div>
  );
}

export default ProjectDetails;