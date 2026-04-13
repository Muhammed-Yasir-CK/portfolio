"use client";

import { LogOut, LayoutDashboard, FileText, Image as ImageIcon, Plus, X, Edit2, Trash2, ExternalLink, CodeXml, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [fetchingProjects, setFetchingProjects] = useState(true);
  const [activeTab, setActiveTab] = useState("projects"); // 'projects' or 'blogs'
  
  // Blog State
  const [blogs, setBlogs] = useState([]);
  const [fetchingBlogs, setFetchingBlogs] = useState(true);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Blog Form State
  const [blogTitle, setBlogTitle] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("");
  const [imageUrls, setImageUrls] = useState("");

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

  const fetchProjects = async () => {
    try {
      setFetchingProjects(true);
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setFetchingProjects(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      setFetchingBlogs(true);
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setFetchingBlogs(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/admin";
      } else {
        fetchProjects();
        fetchBlogs();
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/admin";
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTech("");
    setGithub("");
    setLive("");
    setEditingId(null);
    setImageUrls("");
    // Blog resets
    setBlogTitle("");
    setBlogExcerpt("");
    setBlogDate("");
    setBlogReadTime("");
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const techArray = tech.split(",").map(t => t.trim()).filter(Boolean);
      // Clean, split, and convert image URLs
      const finalImages = imageUrls
        .split("\n")
        .map(url => url.trim())
        .filter(Boolean)
        .map(url => convertGdriveLink(url))
        .slice(0, 5);
      
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), {
          title,
          description,
          tech: techArray,
          github,
          live,
          images: finalImages,
          updatedAt: serverTimestamp()
        });
        alert("Project updated successfully!");
      } else {
        await addDoc(collection(db, "projects"), {
          title,
          description,
          tech: techArray,
          github,
          live,
          images: finalImages,
          createdAt: serverTimestamp()
        });
        alert("Project added successfully!");
      }
      setShowForm(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error("Error saving to Firebase:", err);
      alert("Error saving project, please check Firebase permissions!");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const finalImages = imageUrls
        .split("\n")
        .map(url => url.trim())
        .filter(Boolean)
        .map(url => convertGdriveLink(url))
        .slice(0, 5); 

      const blogData = {
        title: blogTitle,
        excerpt: blogExcerpt,
        date: blogDate,
        readTime: blogReadTime,
        images: finalImages,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, "blogs", editingId), blogData);
        alert("Blog updated successfully!");
      } else {
        await addDoc(collection(db, "blogs"), {
          ...blogData,
          createdAt: serverTimestamp(),
        });
        alert("Blog added successfully!");
      }
      setShowForm(false);
      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      alert("Error saving blog!");
    } finally {
      setSaving(false);
    }
  };

  const handleEditBlog = (blog) => {
    setBlogTitle(blog.title || "");
    setBlogExcerpt(blog.excerpt || "");
    setBlogDate(blog.date || "");
    setBlogReadTime(blog.readTime || "");
    setEditingId(blog.id);
    setImageUrls((blog.images || []).join("\n"));
    setShowForm(true);
  };

  const handleEditClick = (project) => {
    setTitle(project.title || "");
    setDescription(project.description || "");
    setTech((project.tech || []).join(", "));
    setGithub(project.github || "");
    setLive(project.live || "");
    setEditingId(project.id);
    setImageUrls((project.images || []).join("\n"));
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Error deleting project!");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteDoc(doc(db, "blogs", id));
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Error deleting blog!");
    }
  };

  const previewUrls = imageUrls.split("\n").map(url => url.trim()).filter(Boolean).map(url => convertGdriveLink(url)).slice(0, 5);

  if (loading) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f172a] border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
          Admin Panel
        </h2>
        
        <nav className="space-y-2 flex-grow">
          <button 
            onClick={() => { setActiveTab("projects"); setShowForm(false); resetForm(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'projects' ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Projects
          </button>
          <button 
            onClick={() => { setActiveTab("blogs"); setShowForm(false); resetForm(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'blogs' ? 'bg-purple-500/10 text-purple-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" />
            Blogs
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 px-4 py-3 rounded-xl transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage {activeTab === 'projects' ? 'Projects' : 'Blogs'}</h1>
            {!showForm && (
                <button 
                  onClick={() => { resetForm(); setShowForm(true); }} 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'projects' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
                >
                  <Plus className="w-4 h-4"/>
                  Add {activeTab === 'projects' ? 'Project' : 'Blog'}
                </button>
            )}
          </div>

          {showForm ? (
            <div className={`bg-[#0f172a]/80 border ${activeTab === 'projects' ? 'border-blue-500/20' : 'border-purple-500/20'} rounded-2xl p-6 shadow-xl backdrop-blur-md mb-8`}>
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold">{editingId ? `Edit ${activeTab === 'projects' ? 'Project' : 'Blog'}` : `Add New ${activeTab === 'projects' ? 'Project' : 'Blog'}`}</h2>
                 <button onClick={() => { setShowForm(false); resetForm(); }} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              
              <form onSubmit={activeTab === 'projects' ? handleSaveProject : handleSaveBlog} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    {activeTab === 'projects' ? (
                      <>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Project Title</label>
                          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Project Title" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Description</label>
                          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} placeholder="Project Description" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Tech Stack (comma separated)</label>
                          <input type="text" value={tech} onChange={(e) => setTech(e.target.value)} placeholder="Tech Stack (e.g. Next.js, Django, PostgreSQL)" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">GitHub Link</label>
                            <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub URL" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Live Demo Link</label>
                            <input type="url" value={live} onChange={(e) => setLive(e.target.value)} placeholder="Live Demo URL" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Blog Title</label>
                          <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} required placeholder="Blog Title" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Blog Excerpt</label>
                          <textarea value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} required rows={4} placeholder="Brief summary of the article" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Publish Date</label>
                            <input type="text" value={blogDate} onChange={(e) => setBlogDate(e.target.value)} placeholder="e.g. Oct 24, 2024" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors" />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Read Time</label>
                            <input type="text" value={blogReadTime} onChange={(e) => setBlogReadTime(e.target.value)} placeholder="e.g. 5 min read" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Image URLs (Max 5, enter one per line)</label>
                      <div className="relative">
                        <textarea 
                          value={imageUrls} 
                          onChange={(e) => setImageUrls(e.target.value)} 
                          rows={6} 
                          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" 
                          className={`w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white outline-none ${activeTab === 'projects' ? 'focus:border-blue-500' : 'focus:border-purple-500'} transition-colors font-mono text-sm`} 
                        />
                        <LinkIcon className="absolute left-4 top-4 text-gray-500 w-5 h-5 pointer-events-none" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2 italic">* Use Google Drive (Sharing link) or other hosting sites.</p>
                    </div>

                    {/* Simple Previews for those URLs */}
                    {previewUrls.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-slate-800">
                              <img 
                                src={url} 
                                alt="Preview" 
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer"
                                onError={(e) => e.target.src = "https://placehold.co/150x150?text=Invalid+Link"} 
                              />
                             <div className="absolute top-1 right-1 bg-black/50 text-[8px] px-1 rounded text-white">{index + 1}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                  <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="px-6 py-3 rounded-xl text-gray-400 font-medium hover:text-white transition-colors">Cancel</button>
                  <button type="submit" disabled={saving} className={`${activeTab === 'projects' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'} text-white px-8 py-3 rounded-xl font-medium disabled:opacity-50 transition-colors flex items-center gap-2`}>
                    {saving ? "Saving..." : (editingId ? `Update ${activeTab === 'projects' ? 'Project' : 'Blog'}` : `Save ${activeTab === 'projects' ? 'Project' : 'Blog'}`)}
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          {/* List Section */}
          {!showForm && (
            <div className={`bg-white/5 border border-white/10 rounded-2xl p-6`}>
              <h2 className="text-xl font-bold mb-6">Existing {activeTab === 'projects' ? 'Projects' : 'Blogs'}</h2>
              
              {activeTab === 'projects' ? (
                fetchingProjects ? (
                  <div className="text-center py-8 text-gray-500">Loading projects...</div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No projects found.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {projects.map((project) => (
                      <div key={project.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-white/20 transition-colors">
                        <div className="flex gap-4 items-center flex-1">
                          <div className="w-20 h-20 rounded-xl bg-slate-800 flex-shrink-0 overflow-hidden border border-white/10">
                              {project.images && project.images.length > 0 ? (
                                <img 
                                  src={convertGdriveLink(project.images[0])} 
                                  alt={project.title} 
                                  className="w-full h-full object-cover" 
                                  referrerPolicy="no-referrer"
                                />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <ImageIcon className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg mb-1 truncate">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {(project.tech || []).map((t, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">
                                  {t}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-4">
                              {project.github && (
                                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-400 transition-colors">
                                  <CodeXml className="w-3 h-3" /> Code
                                </a>
                              )}
                              {project.live && (
                                <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-400 transition-colors">
                                  <ExternalLink className="w-3 h-3" /> Live Demo
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0 w-full md:w-auto">
                          <button onClick={() => handleEditClick(project)} className="flex-1 md:flex-initial p-2.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                            <Edit2 className="w-4 h-4" />
                            <span className="md:hidden">Edit</span>
                          </button>
                          <button onClick={() => handleDeleteClick(project.id)} className="flex-1 md:flex-initial p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                            <Trash2 className="w-4 h-4" />
                            <span className="md:hidden">Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                fetchingBlogs ? (
                  <div className="text-center py-8 text-gray-500">Loading blogs...</div>
                ) : blogs.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No blogs found.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {blogs.map((blog) => (
                      <div key={blog.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-white/20 transition-colors">
                        <div className="flex gap-4 items-center flex-1">
                          <div className="w-20 h-20 rounded-xl bg-slate-800 flex-shrink-0 overflow-hidden border border-white/10">
                            {blog.images && blog.images.length > 0 ? (
                              <img 
                                src={convertGdriveLink(blog.images[0])} 
                                alt={blog.title} 
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <FileText className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1">
                               <span>{blog.date}</span>
                               <span>•</span>
                               <span>{blog.readTime}</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1 truncate">{blog.title}</h3>
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0 w-full md:w-auto">
                          <button onClick={() => handleEditBlog(blog)} className="flex-1 md:flex-initial p-2.5 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                            <Edit2 className="w-4 h-4" />
                            <span className="md:hidden">Edit</span>
                          </button>
                          <button onClick={() => handleDeleteBlog(blog.id)} className="flex-1 md:flex-initial p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                            <Trash2 className="w-4 h-4" />
                            <span className="md:hidden">Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
