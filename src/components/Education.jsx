"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code, Calendar } from "lucide-react";

export default function Education() {
  const educationData = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "College of Engineering Adoor",
      period: "2022 - 2026",
      description: "Focused on software engineering, data structures and algorithms, and machien learning. Minor in electronics and communication.",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      degree: "Internship",
      institution: "Indian Institute of Space Science and Technology, Thiruvananthapuram",
      period: "2025",
      description: "Worked on machine learning model development using Scikit-learn, including classification algorithms and data science workflows. Gained hands-on experience in data preprocessing, model training, and evaluation.",
      icon: <Code className="w-6 h-6" />
    }
  ];

  return (
    <section id="education" className="min-h-screen py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-4xl mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative pl-8 md:pl-0">
          {/* Main Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent transform -translate-x-1/2" />
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

          <div className="space-y-16">
            {educationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-41px] md:left-1/2 w-10 h-10 rounded-full bg-black border-2 border-purple-500 flex items-center justify-center transform md:-translate-x-1/2 mt-1 z-10 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className={`md:w-1/2 w-full ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-colors shadow-xl">
                    <div className="flex items-center gap-2 text-purple-400 mb-2 font-medium text-sm">
                      <Calendar className="w-4 h-4" />
                      {item.period}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.degree}</h3>
                    <h4 className="text-blue-400 font-medium mb-3">{item.institution}</h4>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
