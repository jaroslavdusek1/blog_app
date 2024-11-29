import axios from 'axios';

export const fetchArticles = async () => {
  const response = await axios.get('/articles');
  return response.data;
};

export const createArticle = async (articleData: any) => {
  const response = await axios.post('/articles', articleData);
  return response.data;
};
