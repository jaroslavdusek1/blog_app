import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../services/articleService';

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  perex: string;
}

const UserArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userArticles = await fetchArticles();
        setArticles(userArticles);
      } catch (err) {
        setError('Failed to fetch articles.');
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">My Articles</h1>
      {articles.length === 0 ? (
        <p className="text-gray-500 text-center">No articles found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 border border-gray-300">ID</th>
                <th className="px-4 py-2 border border-gray-300">Created At</th>
                <th className="px-4 py-2 border border-gray-300">Title</th>
                <th className="px-4 py-2 border border-gray-300">Perex</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr
                  key={article.id}
                  className={`bg-white hover:bg-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : ''
                    } transition-colors`}
                >
                  <td className="px-4 py-2 border border-gray-300 text-center">{article.id}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{article.title}</td>
                  <td className="px-4 py-2 border border-gray-300 truncate max-w-xs">{article.perex || 'No perex available.'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

};

export default UserArticles;
