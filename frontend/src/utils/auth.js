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
    if (!isAuthenticated()) return false;
    
    const authTokens = localStorage.getItem('authTokens');
    const tokens = JSON.parse(authTokens);
    const tokenData = JSON.parse(atob(tokens.access.split('.')[1]));
    
    return tokenData.is_staff === true;
}; 