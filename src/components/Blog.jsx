"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data.length > 0) {
          setBlogs(data);
        }
      } catch (err) {
        console.error("Error fetching blogs: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (!loading && blogs.length === 0) return null;

  return (
    <section id="blog" className="min-h-screen py-24 bg-[#080808] relative overflow-hidden text-white">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
            Latest <span className="text-purple-500">Articles</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        {loading ? (
           <div className="text-center py-20 text-gray-400">Loading blogs...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 group hover:border-purple-500/50 transition-colors flex flex-col"
              >
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                   <span>{blog.date}</span>
                   <span>•</span>
                   <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{blog.readTime || '5 min read'}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                  {blog.excerpt}
                </p>

                <button className="flex items-center gap-2 text-sm text-purple-400 font-medium group-hover:text-purple-300 mt-auto">
                  Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                </button>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
           <button className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-colors">
             View All Posts
           </button>
        </div>
      </div>
    </section>
  );
}
