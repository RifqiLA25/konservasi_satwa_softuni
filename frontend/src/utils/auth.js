export const isAuthenticated = () => {
    const authTokens = localStorage.getItem('authTokens');
    if (!authTokens) return false;
    
    const tokens = JSON.parse(authTokens);
    if (!tokens.access) return false;
    
    // Cek token expiry
    const tokenData = JSON.parse(atob(tokens.access.split('.')[1]));
    if (tokenData.exp * 1000 < Date.now()) {
        clearAuthData();
        return false;
    }
    
    return true;
};

export const clearAuthData = () => {
    localStorage.removeItem('authTokens');
    localStorage.removeItem('userData');
    sessionStorage.clear();
    
    // Clear cookies jika ada
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
};

export const logout = () => {
    clearAuthData();
    // Force reload dan redirect
    window.location.href = '/login';
};

export const isStaff = () => {
    if (!isAuthenticated()) return false;
    
    const authTokens = localStorage.getItem('authTokens');
    const tokens = JSON.parse(authTokens);
    const tokenData = JSON.parse(atob(tokens.access.split('.')[1]));
    return Boolean(tokenData.is_staff);
};

// Tambahkan fungsi helper untuk mendapatkan user data dari token
export const getUserFromToken = () => {
    const authTokens = localStorage.getItem('authTokens');
    if (!authTokens) return null;
    
    const tokens = JSON.parse(authTokens);
    const tokenData = JSON.parse(atob(tokens.access.split('.')[1]));
    
    return {
        user_id: tokenData.user_id,
        username: tokenData.username,
        is_staff: Boolean(tokenData.is_staff),
        email: tokenData.email
    };
};