import React, { useEffect, useState } from 'react';
import { getArticlesByUserId } from '../../services/articleService';

interface Article {
  id: number;
  title: string;
  perex: string | null;
  content: string;
  createdAt: string;
  authorId: number;
  image: string | null;
}

const UserArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const userId = parseInt(localStorage.getItem('userId') || '0', 10);
        if (!userId) {
          setError('User ID not found.');
          return;
        }
        const data: Article[] = await getArticlesByUserId(userId);
        setArticles(data);
      } catch (err) {
        setError('Failed to fetch articles.');
      }
    };

    fetchArticles();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">My Articles</h1>
      {articles.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-md border border-gray-300">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold uppercase">ID</th>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold uppercase">Created At</th>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold uppercase">Title</th>
                <th className="px-6 py-3 text-left text-gray-600 font-semibold uppercase">Perex</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr
                  key={article.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 transition-all`}
                >
                  <td className="px-6 py-4 text-gray-700">{article.id}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{article.title}</td>
                  <td className="px-6 py-4 text-gray-500">{article.perex || 'No perex available.'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserArticleList;
