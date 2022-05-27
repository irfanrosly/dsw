import { TOKEN } from 'settings/constants/common';

export const setAuthToken = token => localStorage.setItem(TOKEN, JSON.stringify(token));

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem(TOKEN);
    return JSON.parse(token);
  } catch {
    return null;
  }
};

// To remove auth token when logged out
export const deleteAuthToken = () => localStorage.removeItem(TOKEN);
