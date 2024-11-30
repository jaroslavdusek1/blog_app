import React, { useEffect, useState } from 'react';
import { getArticlesByUserId } from '../../services/articleService';

// Definice typu článku
interface Article {
  id: number;
  title: string;
  perex: string | null;
  content: string;
  createdAt: string;
  authorId: number;
  image: string | null;
}

const UserArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]); // Typujeme stav jako pole článků
  const [error, setError] = useState<string>(''); // Typujeme chyby jako string

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const userId = parseInt(localStorage.getItem('userId') || '0', 10);

        if (!userId) {
          setError('User ID not found.');
          return;
        }

        const data: Article[] = await getArticlesByUserId(userId); // Přidáme typ k datům
        console.log('data', data);
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
      <h1 className="text-2xl font-bold mb-4">My Articles</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Perex</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="text-center">
                <td className="px-4 py-2 border-b">{article.id}</td>
                <td className="px-4 py-2 border-b">{new Date(article.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">{article.title}</td>
                <td className="px-4 py-2 border-b">{article.perex || 'No perex available.'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserArticleList;
