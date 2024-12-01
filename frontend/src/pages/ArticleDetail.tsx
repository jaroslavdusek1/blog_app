import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleService } from '../services/articleService';
import { Article } from '../types';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>('');

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

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!article) {
    return <p className="text-gray-500 text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row">
        {/* Main Content */}
        <div className="w-full md:w-2/3 pr-4">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-500 mb-4">
            Published on: {new Date(article.createdAt).toLocaleDateString()}
          </p>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto mb-4 rounded-lg shadow-md"
            />
          )}
          <p className="text-lg text-gray-700">{article.content}</p>
        </div>

        {/* Related Articles */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          <ul>
            {relatedArticles.map((relatedArticle) => (
              <li
                key={relatedArticle.id}
                className="mb-4 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition-colors"
              >
                <a href={`/article/${relatedArticle.id}`} className="text-blue-600 hover:underline">
                  {relatedArticle.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
