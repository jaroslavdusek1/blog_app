import React, { useEffect, useState } from 'react';
import { ArticleService} from '../../services/articleService';


interface Article {
  id: number;
  title: string;
  perex: string | null;
  content: string;
  createdAt: string;
  authorId: number;
  image: string | null;
}

const UserArticleList: React.FC = (): JSX.Element => {
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

        const data: Article[] = await ArticleService.getArticlesByUserId(userId);
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
                  className={`bg-white ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-200 transition-colors`}
                >
                  <td className="px-4 py-2 border border-gray-300 text-center">{article.id}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{article.title}</td>
                  <td className="px-4 py-2 border border-gray-300">{article.perex || 'No perex available.'}</td>
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
