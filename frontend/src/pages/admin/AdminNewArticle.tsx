import React, { useState } from 'react';

const AdminNewArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePublish = () => {
    console.log('Publishing article...');
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Image:', image);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">Create a New Article</h1>

      <div className="mb-4 flex justify-end">
        <button
          onClick={handlePublish}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Publish Article
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="title" className="block text-lg font-medium mb-2">
          Article Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter article title..."
        />
      </div>

      <div className="mb-6">
        <label htmlFor="featuredImage" className="block text-lg font-medium mb-2">
          Featured Image
        </label>
        <input
          type="file"
          id="featuredImage"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {image && <p className="mt-2 text-gray-500">Selected image: {image.name}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-lg font-medium mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 h-40 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Support markdown. Yay!"
        />
      </div>
    </div>
  );
};

export default AdminNewArticle;
