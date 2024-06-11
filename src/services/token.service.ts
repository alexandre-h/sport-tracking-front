const userStr = localStorage.getItem('user');
const user = userStr ? JSON.parse(userStr) : "";

export const getToken = (): string | null => {
  return user.token;
};

export const removeToken = (): void => {
  localStorage.removeItem('user');
};
