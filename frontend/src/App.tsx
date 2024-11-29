import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecentArticles from './pages/RecentArticles';
import ArticleDetail from './pages/ArticleDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminArticleList from './pages/admin/AdminArticleList';
import AdminNewArticle from './pages/admin/AdminNewArticle';
import AdminEditArticle from './pages/admin/AdminEditArticle';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecentArticles />} />
        <Route path="/articles" element={<RecentArticles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/articles" element={<AdminArticleList />} />
        <Route path="/user/articles/new" element={<AdminNewArticle />} />
        <Route path="/user/articles/edit/:id" element={<AdminEditArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
