import axios from "axios";

const API_URL = "http://localhost:3000/";

class AuthService {
  async login(email: string, password: string) {
    return axios
      .post(API_URL + "users/sign_in", {
        user: { email, password }
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
  }

  async logout() {
    return axios.delete(API_URL + "users/sign_out").then(response => {
      if (response) {
        localStorage.removeItem("user");
      }
    })

  }

  async register(username: string, email: string, password: string) {
    return axios.post(API_URL + "users", {
      user: {
        username,
        email,
        password,
        first_name: username,
        last_name: username
      }
    }).then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data;
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
