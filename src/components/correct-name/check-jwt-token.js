function checkJWTToken(history, optionalArg = '') {
    if (localStorage.getItem('jwt_token') === null || localStorage.getItem('jwt_token') === 'undefined') {
        history.push(`/articles/${optionalArg}`);
        return '/articles/'
    } else {
        history.push(`/articles/me/${optionalArg}`);
        return '/articles/me/'
    }
}

export default checkJWTToken