export default {
    setAuthentication(token, userId) {
        window.localStorage.setItem('authToken', token);
        window.localStorage.setItem('userId', userId);
    },
    getAuthToken() {
        const token = window.localStorage.getItem('authToken');
        return token;
    },
    getUserId() {
        const userId = window.localStorage.getItem('userId');
        return userId;
    },
    clear() {
        window.localStorage.clear()
    }
}