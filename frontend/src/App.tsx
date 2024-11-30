import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecentArticles from './pages/RecentArticles';
import ArticleDetail from './pages/ArticleDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserArticleList from './pages/user/UserArticleList';
import UserNewArticle from './pages/user/UserNewArticle';
import UserEditArticle from './pages/user/UserEditArticle';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

/**
 * App Component
 *
 * The main application component that serves as the root of the Blog App.
 * It handles routing, layout, and rendering of all pages and components.
 *
 * Features:
 * - Integrates the Navbar and Footer for a consistent layout.
 * - Manages routes for key pages such as Articles, Login, Register, and Admin functionalities.
 * - Provides a responsive and user-friendly design using Tailwind CSS.
 *
 * @component
 */
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
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
