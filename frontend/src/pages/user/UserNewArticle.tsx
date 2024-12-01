import React, { useState } from 'react';
import { marked } from 'marked';
import { ArticleService } from '../../services/articleService';

/**
 * UserNewArticle Component
 *
 * This component allows users to create a new article with a title, short description (perex), content,
 * and a featured image. It includes a markdown editor for the content and a preview mode toggle.
 * The image can be resized and previewed before submission.
 *
 * Features:
 * - Title and short description input fields.
 * - Markdown content editor with a preview toggle.
 * - Image upload and resizing to a maximum of 200x200 pixels.
 * - Form validation for required fields.
 * - Error and success notifications.
 *
 * @component
 * @returns {JSX.Element} Rendered UserNewArticle component.
 */
const UserNewArticle: React.FC = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [perex, setPerex] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  /**
   * Resizes an uploaded image to fit within the specified maximum width and height,
   * while maintaining the aspect ratio.
   *
   * @param {File} file - The image file to resize.
   * @param {number} maxWidth - The maximum width of the resized image.
   * @param {number} maxHeight - The maximum height of the resized image.
   * @returns {Promise<string>} A promise resolving to the resized image as a base64 string.
   */
  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
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

        resolve(canvas.toDataURL('image/jpeg'));
      };

      reader.readAsDataURL(file);
    });
  };

  /**
   * Handles the image upload, resizing it to a maximum size of 200x200 pixels and creating a preview.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event triggered by the file input.
   */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        setImage(null);
        setThumbnail(null);
        return;
      }

      try {
        setError(null);
        setImage(file);

        // Create thumbnail with max size 200x200
        const thumbnailBase64 = await resizeImage(file, 200, 200);
        setThumbnail(thumbnailBase64);
      } catch (error) {
        setError('Failed to process the image.');
      }
    }
  };

  /**
   * Publishes the article by sending the data to the ArticleService.
   * Ensures all required fields are filled and an image is uploaded.
   */
  const handlePublish = async () => {
    if (!title || !perex || !content) {
      setError('Title, perex, and content are required.');
      return;
    }
    if (!image) {
      setError('Please upload a featured image.');
      return;
    }

    const articleData = {
      title: title,
      perex: perex,
      content: content,
      image: thumbnail,
    };

    try {
      const response = await ArticleService.createArticle(articleData);
      console.log('Article created:', response);
      setSuccess('Article published successfully.');
      setTitle('');
      setPerex('');
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
        <label htmlFor="perex" className="block text-lg font-medium mb-2">
          Perex (Short Description)
        </label>
        <textarea
          id="perex"
          value={perex}
          onChange={(e) => setPerex(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 h-20 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter a short description for the article..."
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
        <div className="flex items-center mb-2">
          <span className="mr-4">Markdown Editor</span>
          <label className="flex items-center">
            <span className="mr-2">Preview Mode</span>
            <input
              type="checkbox"
              checked={isPreviewMode}
              onChange={() => setIsPreviewMode((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </label>
        </div>
        {!isPreviewMode ? (
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 h-40 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Support markdown. Yay!"
          />
        ) : (
          <div
            className="w-full border border-gray-300 rounded px-4 py-2 h-40 bg-gray-50 overflow-auto"
            dangerouslySetInnerHTML={{ __html: marked.parse(content || '') as string }}
          />
        )}
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
