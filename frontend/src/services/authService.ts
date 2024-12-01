import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

/**
 * AuthService
 *
 * A service class for handling user authentication and profile-related actions.
 */
export class AuthService {
  /**
   * Register a new user.
   * 
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @param {string} name - The first name of the user.
   * @param {string} surname - The last name of the user.
   * @returns {Promise<any>} - The API response.
   * @throws {Error} - Throws an error if registration fails.
   */
  static async registerUser(username: string, password: string, name: string, surname: string): Promise<any> {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, {
        username,
        password,
        name,
        surname,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to register user.'
      );
    }
  }

  /**
   * Login a user.
   * 
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<any>} - The API response.
   * @throws {Error} - Throws an error if login fails.
   */
  static async loginUser(username: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      // Store user ID in localStorage
      localStorage.setItem('userId', response?.data?.userId || '0');

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to login user.'
      );
    }
  }

  /**
   * Fetch the current user's profile.
   * 
   * @returns {Promise<any>} - The API response containing user profile data.
   * @throws {Error} - Throws an error if fetching the profile fails.
   */
  static async fetchUserProfile(): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  }

  /**
   * Update the current user's profile image.
   * 
   * @param {string} base64Image - The new profile image in Base64 format.
   * @returns {Promise<void>} - Resolves when the image is successfully updated.
   * @throws {Error} - Throws an error if updating the image fails.
   */
  static async updateUserImage(base64Image: string): Promise<void> {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/me/image`,
        { image: base64Image },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update user image.'
      );
    }
  }
}


// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// const registerUser = async (username: string, password: string, name: string, surname: string) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/users/register`, {
//       username,
//       password,
//       name,
//       surname
//     });
//     return response.data; // get a response from the server api
//   } catch (error: any) {
//     throw new Error(
//       error.response?.data?.message || 'Failed to register user.',
//     );
//   }
// };

// const loginUser = async (username: string, password: string) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/auth/login`, {
//       username,
//       password,
//     });

//     // handle userId
//     localStorage.setItem('userId', response?.data?.userId || 0);

//     return response.data;
//   } catch (error: any) {
//     throw new Error(
//       error.response?.data?.message || 'Failed to login user.',
//     );
//   }
// };

// export const fetchUserProfile = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/users/me`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch user profile:', error);
//     throw error;
//   }
// };

// const updateUserImage = async (base64Image: string) => {
//   try {
//     const response = await axios.patch(
//       `${API_BASE_URL}/users/me/image`,
//       { image: base64Image },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//         },
//       }
//     );
//     console.log(response.data.message);
//   } catch (error: any) {
//     throw new Error(
//       error.response?.data?.message || 'Failed to update user image.',
//     );
//   }
// };

// export const authService = {
//   registerUser,
//   loginUser,
//   fetchUserProfile,
//   updateUserImage
// };
