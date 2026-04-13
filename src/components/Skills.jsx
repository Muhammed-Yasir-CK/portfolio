"use client";

import { motion } from "framer-motion";

const skillsMap = [
  { category: "Frontend", items: ["React", "Tailwind CSS"] },
  { category: "Backend", items: ["Django", "Node.js", "Firebase", "MongoDB", "PostgreSQL"] },
  { category: "Machine Learning", items: ["Scikit-Learn", "TensorFlow", "Random Forest", "SVM", "XGBoost", "Logistic Regression", "OpenCV"] },
  { category: "Data Science", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Exploratory Data Analysis (EDA)"] },
  { category: "Tools", items: ["Git", "VS Code"] }
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-24 bg-[#050505] relative overflow-hidden text-white">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
            Technical <span className="text-indigo-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillsMap.map((skillGroup, groupIdx) => (
            <motion.div
              key={groupIdx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-indigo-500 rounded-full block" />
                {skillGroup.category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, idx) => (
                  <div
                    key={idx}
                    className="group relative px-4 py-2 bg-black/40 border border-white/5 rounded-full overflow-hidden hover:border-indigo-500/50 transition-colors cursor-default"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
