import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

/**
 * ArticleService
 *
 * A service class for handling article-related API calls.
 */
export class ArticleService {
  /**
   * Fetch all articles.
   * 
   * @returns {Promise<any>} - The API response containing all articles.
   * @throws {Error} - Throws an error if fetching articles fails.
   */
  static async fetchArticles(): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch articles.');
    }
  }

  /**
   * Create a new article.
   * 
   * @param {any} articleData - The data of the article to create.
   * @returns {Promise<any>} - The API response for the created article.
   * @throws {Error} - Throws an error if creating the article fails.
   */
  static async createArticle(articleData: any): Promise<any> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${API_BASE_URL}/articles`, articleData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create article.');
    }
  }

  /**
   * Fetch articles by user ID.
   * 
   * @param {number} userId - The ID of the user.
   * @returns {Promise<any>} - The API response containing articles for the user.
   * @throws {Error} - Throws an error if fetching articles by user ID fails.
   */
  static async getArticlesByUserId(userId: number): Promise<any> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/articles/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch articles by user ID.');
    }
  }

  // 
  static async getArticleById(id: number) {
    const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
    return response.data;
  }

  static async updateArticle(id: number, articleData: any) {
    const response = await axios.put(`${API_BASE_URL}/articles/${id}`, articleData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response.data;
  }

  static async deleteArticle(id: number) {
    const response = await axios.delete(`${API_BASE_URL}/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response.data;
  }
}
