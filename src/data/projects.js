const projects = [
  {
    id: "brand-identity",
    title: "Photo capturer",
    description: "Modern visual identity and photography collection",
    cover: "/image/holding.webp",
    sections: [ 
      {
        title: "Extrait photo",
        tools: ["Photoshop", "Illustrator"],
        media: [
          { type: "image", src: "/image/sary_1.webp" },
          { type: "image", src: "/image/sary_2.webp" }
        ]
      },
      {
        tools: ["Lightroom"],
        media: [
          { type: "image", src: "/image/sary_3.webp" },
          { type: "image", src: "/image/sary_4.webp" },
          { type: "image", src: "/image/sary_5.webp" }
        ]
      },
      {
        tools: ["Lightroom"],
        media: [
          { type: "image", src: "/image/sary_6.webp" },
          { type: "image", src: "/image/sary_7.webp" },
          { type: "image", src: "/image/sary_8.webp" }
        ]
      },
      {
        tools: ["Lightroom"],
        media: [
          { type: "image", src: "/image/sary_9.webp" },
          { type: "image", src: "/image/sary_10.webp" }          
        ]
      }
    ]
  },
  {
    id: "cinematic-edit",
    title: "Vidéo réalisés",
    description: "Professional cinematic production",
    cover: "/image/sary_11.webp",
    sections: [ 
      {
        title: "Extrait vidéo",
        cover: "/image/brand-cover.webp",
        tools: ["Capcut"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/q_auto/v1778874678/VID-20260313-WA0000_svtvlt.mp4" }
        ]
      },
      {
        cover: "/image/brand-cover.webp",
        tools: ["Premier Pro"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/q_auto/v1778874652/tablette_ssdwba.mp4" }
        ]
      },
      {
        cover: "/image/closeup.webp",
        tools: ["Premiere Pro"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/q_auto/v1778874616/sortie_recreative_ixeqv6.mp4" }
        ]
      },
      {
        cover: "/image/brand-cover.webp",
        tools: ["Premier Pro"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/q_auto/v1778874428/astuce_beauty_xak5vy.mp4" }
        ]
      },
      {
        cover: "/image/closeup.webp",
        tools: ["Premier Pro"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/q_auto/v1778874465/atelier_de_vacance_v7sbsd.mp4" }
        ]
      },
      {
        cover: "/image/brand-cover.webp",
        tools: ["Premier Pro"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/q_auto/v1778874572/atelier_aoux7m.mp4" }
        ]
      },
      {
        cover: "/image/closeup.webp",
        tools: ["Premier Pro"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/f_auto,q_auto/v1778874527/exercices_acs_nuq6ia.mp4" }
        ]
      },
      {
        cover: "/image/brand-cover.webp",
        tools: ["Premier Pro"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/f_auto,q_auto/v1778874542/nouvelles_formations_qqq4an.mp4" }
        ]
      },
      {
        cover: "/image/closeup.webp",
        tools: ["Premier Pro"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/f_auto,q_auto/v1778874648/trousse_manucure_offert_bjzvdf.mp4" }
        ]
      },
      {
        cover: "/image/brand-cover.webp",
        tools: ["Premier Pro"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/f_auto,q_auto/v1778874645/visuel_vid%C3%A9o_pidcqp.mp4" }
        ]
      },
      {        
        cover: "/image/closeup.webp",
        tools: ["Premier Pro"],
        media: [
          { type: "video", src: "https://res.cloudinary.com/dtcftxbpf/video/upload/f_auto,q_auto/v1778874670/weather_uitmxf.mp4" }
        ]
      },
    ]
  },
  {
    id: "brand-affiche",
    title: "Affiches réalisés",
    description: "Modern visual identity and photography collection",
    cover: "/image/young_autre.webp",
    sections: [ 
      {
        title: "Brand Identity",
        description: "Modern visual identity project",
        cover: "/images/brand-cover.webp",
        tools: ["Photoshop"],
        media: [
          { type: "image", src: "/image/avis aux etudiants.webp" },
          { type: "image", src: "/image/salon-novotel.webp" },
          { type: "image", src: "/image/atelier.webp" },
          { type: "image", src: "/image/conseiller juridique.webp" },
          { type: "image", src: "/image/formation aide soignante.webp" }
        ]
      },
      {
        title: "Photo Shoot",
        description: "Professional photography project",
        cover: "/image/closeup.webp",
        tools: ["Photoshop"],
        media: [
          { type: "image", src: "/image/assistante-virtuelle.webp" },
          { type: "image", src: "/image/formation cm.webp" },
          { type: "image", src: "/image/formation cuisine.webp" }
        ]
      },
      {
        title: "Photo Shoot",
        description: "Professional photography project",
        cover: "/image/closeup.webp",
        tools: ["Photoshop"],
        media: [
          { type: "image", src: "/image/informatique bureautique.webp" },
          { type: "image", src: "/image/base de l'hotelerie.webp" },
          { type: "image", src: "/image/aide-soignante.webp" },
          { type: "image", src: "/image/nutrition-et-dietetique.webp" },
          { type: "image", src: "/image/formation comptable.webp" }
        ]
      },
      {
        title: "Photo Shoot",
        description: "Professional photography project",
        cover: "/image/closeup.webp",
        tools: ["Photoshop"],
        media: [
          { type: "image", src: "/image/3-en-1.webp" }
        ]
      }
    ]
  }
];

export default projects;
