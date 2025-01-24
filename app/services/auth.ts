export const authService = {
    login: (userId: number) => {
      localStorage.setItem('userId', userId.toString());
    },
    logout: () => {
      localStorage.removeItem('userId');
    },
    getUserId: () => {
      return localStorage.getItem('userId');
    },
    isAuthenticated: () => {
      return !!localStorage.getItem('userId');
    },
  };
  