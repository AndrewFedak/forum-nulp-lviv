function correctName(value) {
    if (String(value).match(/1$/)) {
        return 'КОРИСТУВАЧ'
    } else if (String(value).match(/(2|3|4)$/)) {
        return 'КОРИСТУВАЧІ'
    } else {
        return 'КОРИСТУВАЧІВ'
    }
}

export default correctName;