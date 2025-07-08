// App.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid';

const Portfolio = () => {
  const skills = [
    { name: 'Languages', items: 'C, C++, Python, Java, JavaScript, SQL' },
    { name: 'Web Development', items: 'MERN Stack' },
    { name: 'Database', items: 'MySQL, MongoDB' },
  ];

  const projects = [
    {
      title: 'StockTrackPro',
      tech: 'MERN, Chart.js, Alpha Vantage API',
      description: 'Built Trie-based search...',
      links: { demo: '#', github: '#' }
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 px-4"
      >
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Onkar Bhojane
        </h1>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="mailto:onkar.bhojane22@vit.edu" className="flex items-center hover:text-blue-400 transition">
            <EnvelopeIcon className="w-5 h-5 mr-2" />
            Email
          </a>
          <a href="tel:+919623558775" className="flex items-center hover:text-blue-400 transition">
            <DevicePhoneMobileIcon className="w-5 h-5 mr-2" />
            +91 9623558775
          </a>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-blue-400 transition">GitHub</a>
          <a href="#" className="hover:text-blue-400 transition">LinkedIn</a>
        </div>
      </motion.header>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-400">{skill.name}</h3>
              <p className="text-gray-300">{skill.items}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-l-4 border-blue-500 bg-gray-800 p-6 rounded-r-lg hover:bg-gray-700 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <div className="flex space-x-4">
                  <a href={project.links.demo} className="text-blue-400 hover:text-blue-300">Demo</a>
                  <a href={project.links.github} className="text-blue-400 hover:text-blue-300">GitHub</a>
                </div>
              </div>
              <p className="text-gray-300 mb-2">Tech: {project.tech}</p>
              <p className="text-gray-400">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Portfolio;