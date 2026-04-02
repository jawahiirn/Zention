import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

export const useAuthToken = () => {
    const getToken = () => Cookies.get(TOKEN_KEY);

    const setToken = (token: string) => {
        Cookies.set(TOKEN_KEY, token, {
            expires: 7, // 7 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
    };

    const removeToken = () => {
        Cookies.remove(TOKEN_KEY);
    };

    return { getToken, setToken, removeToken };
};

// Helper for non-hook usage (e.g. in API client)
export const getAuthToken = () => Cookies.get(TOKEN_KEY);
