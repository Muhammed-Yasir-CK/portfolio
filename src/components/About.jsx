"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="min-h-screen py-24 bg-[#050505] relative pt-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
            About <span className="text-blue-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-gray-400 text-lg leading-relaxed"
          >
            <p>
              I’m an aspiring Software Developer passionate about building modern, scalable, and user-friendly applications. What started as curiosity has grown into a drive to create impactful digital solutions.
            </p>
            <p>
              I enjoy working across the full stack and actively explore Artificial Intelligence and Machine Learning to build intelligent, data-driven systems.
            </p>
            <p>
              I believe in continuous learning, constantly improving my skills and working towards developing solutions that solve real-world problems.
            </p>
            <p>
              Beyond coding, I explore new technologies, work on personal projects, and learn about software architecture.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full text-center">
                <span className="block text-3xl font-bold text-white mb-2">1+</span>
                <span className="text-sm">Year Experience</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full text-center">
                <span className="block text-3xl font-bold text-white mb-2">5+</span>
                <span className="text-sm">Projects Completed</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Interest Cards */}
            {["Web Development", "Mobile App Development", "Full Stack Development", "Machine Learning"].map((interest, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-blue-500/50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 border border-blue-500/30 text-blue-400">
                  ⚡
                </div>
                <h3 className="text-white font-medium">{interest}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
