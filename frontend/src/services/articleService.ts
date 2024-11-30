import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const fetchArticles = async () => {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data;
};

export const createArticle = async (articleData: any) => {
  const token = localStorage.getItem('authToken');
  const response = await axios.post(`${API_BASE_URL}/articles`, articleData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // add a token to the request
    },
  });
  return response.data;
};
