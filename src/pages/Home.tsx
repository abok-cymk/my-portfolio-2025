// src/pages/Home.tsx
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>My Portfolio | Home</title>
        <meta name="description" content="Computer Science Student specializing in Full-Stack Development" />
      </Helmet>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <section className="mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Allan Abok</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Full-Stack Developer & Computer Science Student
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
              I build exceptional digital experiences with modern web technologies.
              Currently specializing in React, Node.js, and cloud technologies.
            </p>
          </motion.div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 
              'Tailwind CSS', 'AWS', 'Docker'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium">{skill}</h3>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.main>
    </>
  );
}