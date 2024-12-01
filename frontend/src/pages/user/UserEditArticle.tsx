import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleService } from '../../services/articleService';

const UserEditArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id) {
          setError('Invalid article ID.');
          return;
        }
        const article = await ArticleService.getArticleById(Number(id));
        setTitle(article.title);
        setContent(article.content);
        setThumbnail(article.image || null);
      } catch (err) {
        setError('Failed to fetch article.');
      }
    };
    fetchArticle();
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleUpdate = async () => {
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    const updatedData = {
      title,
      content,
      image: thumbnail,
    };

    try {
      await ArticleService.updateArticle(Number(id), updatedData);
      setSuccess('Article updated successfully.');
      setError(null);
    } catch (err) {
      setError('Failed to update article. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>

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
          onClick={handleUpdate}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Article
        </button>
      </div>
    </div>
  );
};

export default UserEditArticle;
