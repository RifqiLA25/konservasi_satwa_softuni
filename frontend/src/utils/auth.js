export const isAuthenticated = () => {
    const authTokens = localStorage.getItem('authTokens');
    if (!authTokens) return false;
    
    const tokens = JSON.parse(authTokens);
    if (!tokens.access) return false;
    
    // Cek token expiry (opsional)
    const tokenData = JSON.parse(atob(tokens.access.split('.')[1]));
    if (tokenData.exp * 1000 < Date.now()) {
        localStorage.removeItem('authTokens');
        return false;
    }
    
    return true;
};

export const isStaff = () => {
    const userData = localStorage.getItem('userData');
    if (!userData) return false;
    
    const user = JSON.parse(userData);
    return Boolean(user.is_staff);
}; 