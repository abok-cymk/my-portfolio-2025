import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  gpa?: string;
};

export default function Education() {
  // Initialize education entries from localStorage or use empty array
  const [educationList, setEducationList] = useState<Education[]>(() => {
    const savedEducation = localStorage.getItem('portfolio-education');
    return savedEducation ? JSON.parse(savedEducation) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Partial<Education> | null>(null);

  // Save education to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolio-education', JSON.stringify(educationList));
  }, [educationList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentEducation) {
      setCurrentEducation({
        ...currentEducation,
        [name]: value
      });
    }
  };

  const handleAddNew = () => {
    setCurrentEducation({
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      location: ''
    });
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleEdit = (education: Education) => {
    setCurrentEducation({ ...education });
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setEducationList(prev => prev.filter(edu => edu.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentEducation) {
      if (isEditing) {
        // Update existing education
        setEducationList(prev => 
          prev.map(edu => edu.id === currentEducation.id ? { ...currentEducation as Education } : edu)
        );
      } else {
        // Add new education
        setEducationList(prev => [...prev, currentEducation as Education]);
      }
      
      // Reset form
      setCurrentEducation(null);
      setIsAdding(false);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setCurrentEducation(null);
    setIsAdding(false);
    setIsEditing(false);
  };

  return (
    <>
      <Helmet>
        <title>My Portfolio | Education</title>
        <meta name="description" content="My educational background and qualifications" />
      </Helmet>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Education</h1>
            {!isAdding && !isEditing && (
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center"
              >
                <FiPlus className="mr-2" />
                Add Education
              </button>
            )}
          </div>

          {/* Education Form */}
          {(isAdding || isEditing) && currentEducation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
            >
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? 'Edit Education' : 'Add New Education'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={currentEducation.institution || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="University or School Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={currentEducation.location || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={currentEducation.degree || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Bachelor's, Master's, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      name="field"
                      value={currentEducation.field || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Computer Science, Engineering, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      name="startDate"
                      value={currentEducation.startDate || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date (or Expected)
                    </label>
                    <input
                      type="month"
                      name="endDate"
                      value={currentEducation.endDate || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      GPA (Optional)
                    </label>
                    <input
                      type="text"
                      name="gpa"
                      value={currentEducation.gpa || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={currentEducation.description || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Relevant courses, achievements, or activities"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center"
                  >
                    <FiCheck className="mr-2" />
                    {isEditing ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Education List */}
          {educationList.length > 0 ? (
            <div className="space-y-6">
              {educationList.map((education) => (
                <motion.div
                  key={education.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {education.institution}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {education.degree} in {education.field}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {education.location}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {new Date(education.startDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })} - {
                          education.endDate 
                            ? new Date(education.endDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short' 
                              }) 
                            : 'Present'
                        }
                      </p>
                      {education.gpa && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          GPA: {education.gpa}
                        </p>
                      )}
                      {education.description && (
                        <p className="text-gray-700 dark:text-gray-300 mt-3">
                          {education.description}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(education)}
                        className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                        aria-label="Edit education"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(education.id)}
                        className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                        aria-label="Delete education"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            !isAdding && (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">
                  No education entries yet. Click "Add Education" to get started.
                </p>
              </div>
            )
          )}
        </section>
      </motion.main>
    </>
  );
}
