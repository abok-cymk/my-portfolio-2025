// src/pages/Projects.tsx
import { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiUpload, FiX, FiTag, FiGithub, FiEye, FiPlus, FiCheck } from 'react-icons/fi';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'frontend' | 'backend' | 'fullstack';
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  isNew?: boolean;
};

// Default projects to use if no projects are in localStorage
const defaultProjects: Project[] = [];

export default function Projects() {
  // Initialize projects from localStorage or use defaults
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('portfolio-projects');
    return savedProjects ? JSON.parse(savedProjects) : defaultProjects;
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'fullstack'>('all');
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Handle file uploads with image conversion to base64
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      // Create a new project with the first uploaded image
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            // Store image as base64 string for localStorage persistence
            const imageData = event.target.result as string;
            
            setEditingProject({
              id: `new-${Date.now()}`,
              title: 'New Project',
              description: 'Add your project description here',
              image: imageData,
              category: 'frontend',
              tags: [],
              isNew: true
            });
            setIsEditing(false);
          }
        };
        
        reader.readAsDataURL(file);
      }
    }
  });

  const handleAddTag = () => {
    if (tagInput.trim() && editingProject) {
      setEditingProject({
        ...editingProject,
        tags: [...(editingProject.tags || []), tagInput.trim()]
      });
      setTagInput('');
      tagInputRef.current?.focus();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        tags: editingProject.tags?.filter(tag => tag !== tagToRemove) || []
      });
    }
  };

  const handleSaveProject = () => {
    if (editingProject) {
      if (isEditing) {
        // Update existing project
        setProjects(prev => prev.map(p => 
          p.id === editingProject.id ? {...editingProject as Project} : p
        ));
      } else {
        // Add new project
        setProjects(prev => [...prev, editingProject as Project]);
      }
      setEditingProject(null);
    }
  };
  
  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
  }, [projects]);

  const handleCancelProject = () => {
    setEditingProject(null);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject({...project});
    setIsEditing(true);
  };

  const handleProjectChange = (field: keyof Project, value: string) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        [field]: value
      });
    }
  };

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>My Portfolio | Projects</title>
        <meta name="description" content="My featured projects and work samples" />
      </Helmet>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-6">My Projects</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {['all', 'frontend', 'backend', 'fullstack'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative group">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-200 transition-colors"
                      aria-label="Edit project"
                    >
                      <FiTag className="w-5 h-5" />
                    </button>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-200 transition-colors"
                        aria-label="View source code"
                      >
                        <FiGithub className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-200 transition-colors"
                        aria-label="View live demo"
                      >
                        <FiEye className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {!editingProject && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Add Project Screenshots</h2>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400'
                }`}
              >
                <input {...getInputProps()} />
                <FiUpload className="mx-auto text-3xl mb-2 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  {isDragActive 
                    ? 'Drop the files here...' 
                    : 'Drag & drop project screenshots here, or click to select files'}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  (JPEG, PNG files only - projects are saved to your browser)
                </p>
              </div>
            </div>
          )}

          {editingProject && (
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Image
                    </label>
                    <div className="relative rounded-lg overflow-hidden h-48">
                      <img 
                        src={editingProject.image} 
                        alt="Project preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={editingProject.title || ''}
                      onChange={(e) => handleProjectChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editingProject.description || ''}
                      onChange={(e) => handleProjectChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={editingProject.category || 'frontend'}
                      onChange={(e) => handleProjectChange('category', e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="fullstack">Full Stack</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.githubUrl || ''}
                      onChange={(e) => handleProjectChange('githubUrl', e.target.value)}
                      placeholder="https://github.com/yourusername/project"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.liveUrl || ''}
                      onChange={(e) => handleProjectChange('liveUrl', e.target.value)}
                      placeholder="https://your-project-demo.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editingProject.tags?.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {tag}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        ref={tagInputRef}
                        placeholder="Add a tag"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      >
                        <FiPlus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={handleCancelProject}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center"
                >
                  <FiCheck className="mr-2" />
                  {isEditing ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </div>
          )}
        </section>
      </motion.main>
    </>
  );
}