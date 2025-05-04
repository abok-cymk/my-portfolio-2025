import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiEdit2, FiX, FiSave } from 'react-icons/fi';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

// Default about content if none exists in localStorage
const defaultContent = `
<h2>About Me</h2>
<p>Hello! I'm a passionate Computer Science student with expertise in full-stack web development. I love building modern, responsive, and accessible web applications.</p>

<h3>My Skills</h3>
<ul>
  <li><strong>Frontend:</strong> React, TypeScript, TailwindCSS, Framer Motion</li>
  <li><strong>Backend:</strong> Node.js, Express, MongoDB, PostgreSQL</li>
  <li><strong>Tools:</strong> Git, Docker, AWS, Firebase</li>
</ul>

<h3>My Approach</h3>
<p>I believe in writing clean, maintainable code with a focus on user experience. I'm constantly learning new technologies and techniques to improve my skills.</p>

<h3>When I'm Not Coding</h3>
<p>I enjoy hiking, reading science fiction, and experimenting with new recipes in the kitchen.</p>
`;

export default function About() {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutContent, setAboutContent] = useState(() => {
    const savedContent = localStorage.getItem('portfolio-about');
    return savedContent || defaultContent;
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing about yourself...',
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: aboutContent,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setAboutContent(html);
    },
  });

  // Save content to localStorage when it changes
  useEffect(() => {
    if (aboutContent) {
      localStorage.setItem('portfolio-about', aboutContent);
    }
  }, [aboutContent]);

  // Update editor editable state when isEditing changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing);
    }
  }, [isEditing, editor]);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (editor) {
      editor.commands.setContent(aboutContent);
    }
    setIsEditing(false);
  };

  return (
    <>
      <Helmet>
        <title>My Portfolio | About Me</title>
        <meta name="description" content="Learn more about me, my skills, and background" />
      </Helmet>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">About Me</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center"
            >
              <FiEdit2 className="mr-2" />
              Edit
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center"
              >
                <FiX className="mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center"
              >
                <FiSave className="mr-2" />
                Save
              </button>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-2 rounded ${
                  editor?.isActive('bold')
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Bold"
              >
                <span className="font-bold">B</span>
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-2 rounded ${
                  editor?.isActive('italic')
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Italic"
              >
                <span className="italic">I</span>
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded ${
                  editor?.isActive('underline')
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Underline"
              >
                <span className="underline">U</span>
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded ${
                  editor?.isActive('heading', { level: 2 })
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Heading 2"
              >
                H2
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded ${
                  editor?.isActive('heading', { level: 3 })
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Heading 3"
              >
                H3
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded ${
                  editor?.isActive('bulletList')
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Bullet List"
              >
                • List
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded ${
                  editor?.isActive('orderedList')
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Numbered List"
              >
                1. List
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                className={`p-2 rounded ${
                  editor?.isActive({ textAlign: 'left' })
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Align Left"
              >
                ←
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                className={`p-2 rounded ${
                  editor?.isActive({ textAlign: 'center' })
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Align Center"
              >
                ↔
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                className={`p-2 rounded ${
                  editor?.isActive({ textAlign: 'right' })
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Align Right"
              >
                →
              </button>
              <button
                onClick={() => {
                  const url = window.prompt('Enter the URL');
                  if (url) {
                    editor?.chain().focus().setLink({ href: url }).run();
                  }
                }}
                className={`p-2 rounded ${
                  editor?.isActive('link')
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Add Link"
              >
                🔗
              </button>
            </div>
            <EditorContent 
              editor={editor} 
              className="prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-2" 
            />
          </div>
        )}

        {!isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: aboutContent }}
            />
          </motion.div>
        )}
      </motion.main>
    </>
  );
}
