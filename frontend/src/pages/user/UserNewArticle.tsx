import React, { useState } from 'react';
import { createArticle } from '../../services/articleService';

const UserNewArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resizeImage = (file: File, maxWidth: number, maxHeight: number) => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      reader.onerror = reject;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        let { width, height } = img;

        // Maintain aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg')); // Returns resized image as base64
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!!file && !file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        setImage(null);
        setThumbnail(null);
        return;
      }

      try {
        setError(null);
        setImage(file);

        // Create thumbnail with max size 100x100
        const thumbnailBase64 = await resizeImage(file, 100, 100);
        setThumbnail(thumbnailBase64);
      } catch (error) {
        setError('Failed to process the image.');
      }
    }
  };

  const handlePublish = async () => {
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }
    if (!image) {
      setError('Please upload a featured image.');
      return;
    }

    const articleData = {
      title: title,
      content: content,
      image: image,
      thumbnail: thumbnail || ''
    };

    try {
      const response = await createArticle(articleData);
      console.log('Article created:', response);
      setSuccess('Article published successfully!');
      setTitle('');
      setContent('');
      setImage(null);
      setThumbnail(null);
    } catch (err) {
      setError('Failed to publish the article. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">Create a New Article</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

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
        {thumbnail && (
          <div className="mt-4">
            <p className="text-gray-700">Thumbnail Preview:</p>
            <img src={thumbnail} alt="Thumbnail preview" className="w-24 h-24 rounded border" />
          </div>
        )}
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

      <div className="flex justify-end">
        <button
          onClick={handlePublish}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Publish Article
        </button>
      </div>
    </div>
  );
};

export default UserNewArticle;
