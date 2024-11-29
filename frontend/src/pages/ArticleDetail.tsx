import React from 'react';

function ArticleDetail() {
  return (
    <div className="p-4">
      <h1>Article Title</h1>
      <p>Published on: [Date]</p>
      <img src="[Image URL]" alt="Article" />
      <p>Article Content</p>
      <h2>Comments</h2>
      {/* Sem přijde seznam komentářů */}
    </div>
  );
}

export default ArticleDetail;
