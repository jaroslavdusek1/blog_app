import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { ArticleService } from '../services/articleService';
import { Article } from '../types';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        if (id) {
          const fetchedArticle = await ArticleService.fetchArticleById(Number(id));
          const related = await ArticleService.fetchRelatedArticles(Number(id));
          setArticle(fetchedArticle);
          setRelatedArticles(related);
        }
      } catch (err) {
        setError('Failed to fetch article details.');
      }
    };
    fetchArticleDetails();
  }, [id]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      console.log(`New comment: ${comment}`);
      setComment('');
    }
  };

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!article) {
    return <p className="text-gray-500 text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-12 flex flex-col md:flex-row gap-12">
      {/* Main content */}
      <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 border-b pb-4">{article.title}</h1>
        <p className="text-gray-500 mb-6">
          <span className="font-semibold">Published:</span>{' '}
          {new Date(article.createdAt).toLocaleDateString()}
        </p>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-[200px] h-[200px] object-cover mb-4 rounded-lg shadow-md"
          />
        )}
        <div
          className="text-lg text-gray-700 border p-6 rounded-lg bg-gray-50 shadow-inner"
          dangerouslySetInnerHTML={{ __html: marked.parse(article.content || '') as string }}
        />

        {/* Comment Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="mt-4">
            <label htmlFor="commentInput" className="block text-lg font-medium mb-2">
              Join the discussion
            </label>
            <input
              type="text"
              id="commentInput"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Related Articles</h2>
        <ul className="space-y-4">
          {relatedArticles.map((relatedArticle) => (
            <li
              key={relatedArticle.id}
              className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              <a
                href={`/article/${relatedArticle.id}`}
                className="text-blue-600 hover:underline font-semibold"
              >
                {relatedArticle.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleDetail;
