import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleService } from '../../services/articleService';

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const userId = parseInt(localStorage.getItem('userId') || '0', 10);
        if (!userId) {
          setError('User ID not found.');
          return;
        }

        const data: Article[] = await ArticleService.getArticlesByUserId(userId);
        setArticles(data);
      } catch (err) {
        setError('Failed to fetch articles.');
      }
    };
    fetchArticles();
  }, []);

  const handleEditClick = (id: number) => {
    navigate(`/user/articles/edit/${id}`);
  };

  const handleDeleteClick = async (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this article?'
    );
    if (!confirmed) return;

    try {
      await ArticleService.deleteArticle(id);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
    } catch (err) {
      setError('Failed to delete article.');
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">My Articles</h1>
      {articles.length === 0 ? (
        <p className="text-gray-500 text-center">No articles found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-center">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Created At</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Title</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Perex</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {article.id}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {new Date(article.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {article.title}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {article.perex || 'No perex available.'}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(article.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(article.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserArticleList;
