import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../services/articleService';

const UserArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userArticles = await fetchArticles();
      setArticles(userArticles);
    };
    fetchData();
  }, []);

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {/* {articles.map((article) => (
          <tr key={article.id}>
            <td>{article.title}</td>
            <td>{article.content}</td>
            <td>{new Date(article.createdAt).toLocaleString()}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default UserArticles;
