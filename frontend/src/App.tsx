import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecentArticles from './pages/RecentArticles';
import ArticleDetail from './pages/ArticleDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserArticleList from './pages/admin/UserArticleList';
import UserNewArticle from './pages/admin/UserNewArticle';
import UserEditArticle from './pages/admin/UserEditArticle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      {/* Overall application layout */}
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-200 via-gray-250 to-gray-300">
        <Navbar />

        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<RecentArticles />} />
            <Route path="/articles" element={<RecentArticles />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/articles" element={<UserArticleList />} />
            <Route path="/user/articles/new" element={<UserNewArticle />} />
            <Route path="/user/articles/edit/:id" element={<UserEditArticle />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
