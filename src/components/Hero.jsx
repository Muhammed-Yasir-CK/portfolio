"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-[#0a0f1c] to-[#040814]" />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="z-10 max-w-6xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            👋 Welcome to my portfolio
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
            Hi, I&apos;m <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Muhammed Yasir CK
            </span>
          </h1>

          <div className="text-2xl md:text-3xl font-medium text-gray-300 mb-6 h-[40px]">
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "AI/ML Enthusiast",
                2000,
                "Creative Problem Solver",
                2000,
                "Web Developer",
                2000,
                "Mobile App Developer",
                2000,

              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="text-lg text-gray-400 mb-8 max-w-lg">
            From logic to learning, I craft digital solutions that combine solid engineering with the power of AI to solve real-world problems in smarter ways.          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium transition-transform hover:scale-105"
            >
              View Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-medium transition-all hover:bg-white/10 hover:scale-105 backdrop-blur-sm"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:flex justify-center items-center"
        >
          {/* Profile Image Wrap */}
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full p-2 bg-gradient-to-tr from-blue-500 to-purple-500">
            <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm p-2">
              <div className="w-full h-full rounded-full bg-[#111] overflow-hidden border-4 border-black relative">
                {/* Profile Image - Uses /profile.png from the public folder */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full border border-white/10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-[#1a1a2e] to-[#16213e]"
                >
                  <img src="/profile.png" alt="Muhammed Yasir CK" className="w-full h-full object-cover object-top" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Floating UI Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl"
          >
            <span className="text-2xl h-8 w-8 flex items-center justify-center">⚡</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl"
          >
            <span className="text-2xl h-8 w-8 flex items-center justify-center">💻</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
