"use client";
// Force refresh
import { motion, AnimatePresence } from "framer-motion";
import { CodeXml, ExternalLink, ChevronLeft, ChevronRight, X, Maximize2, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CodeRain from "./CodeRain";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const convertGdriveLink = (url) => {
    if (!url) return "";
    
    // Format 1: /file/d/ID/view
    const driveRegex1 = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    // Format 2: ?id=ID or &id=ID
    const driveRegex2 = /[?&]id=([a-zA-Z0-9_-]+)/;
    
    const match1 = url.match(driveRegex1);
    const match2 = url.match(driveRegex2);
    
    const fileId = (match1 && match1[1]) || (match2 && match2[1]);
    
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return url;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const openLightbox = (project) => {
    if (project.images && project.images.length > 0) {
      setSelectedProject(project);
      setActiveImageIndex(0);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  return (
    <section id="projects" className="min-h-screen py-24 bg-[#020617] relative overflow-hidden text-white">
      <CodeRain />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading projects...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col"
              >
                {/* Project Image Container */}
                <div 
                  className="w-full h-48 relative overflow-hidden flex-shrink-0 cursor-pointer group/img"
                  onClick={() => openLightbox(project)}
                >
                  <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/5 transition-colors duration-300 z-10" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-20 bg-black/40">
                    <div className="flex flex-col items-center gap-2">
                       <Maximize2 className="w-8 h-8 text-white" />
                       <span className="text-xs font-medium text-white uppercase tracking-wider">Preview Mode</span>
                    </div>
                  </div>

                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={convertGdriveLink(project.images[0])} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover/img:scale-110 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                      onError={(e) => e.target.src = "https://placehold.co/600x400?text=Image+Unavailable"}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                      <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {(project.tech || []).map((t, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 border-t border-slate-700/50 pt-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-gray-300 hover:text-white hover:text-blue-400 transition-colors">
                        <CodeXml className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-gray-300 hover:text-white hover:text-blue-400 transition-colors">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Preview Mode */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute inset-0 bg-black/95 backdrop-blur-md" 
            />

            {/* Compact Content Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative aspect-video bg-black/50 flex items-center justify-center group/lightbox">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={convertGdriveLink(selectedProject.images[activeImageIndex])}
                    alt={`${selectedProject.title} preview`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-h-full max-w-full object-contain p-2"
                    referrerPolicy="no-referrer"
                    onError={(e) => e.target.src = "https://placehold.co/800x600?text=Image+Unavailable"}
                  />
                </AnimatePresence>

                {/* Navigation Controls */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/50 hover:text-white hover:bg-black/80 transition-all backdrop-blur-sm border border-white/5"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/50 hover:text-white hover:bg-black/80 transition-all backdrop-blur-sm border border-white/5"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Counter & Title Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                   <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-white/60 border border-white/10 shadow-xl">
                      {selectedProject.title} • {activeImageIndex + 1} of {selectedProject.images.length}
                   </div>
                </div>
              </div>

              {/* Minimal Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white/60 hover:text-white hover:bg-red-500/50 transition-all backdrop-blur-md z-20 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
