const selectOpenId = (openid) => {
    return `SELECT * FROM users WHERE openid='${openid}'`
}
const createUser = (data) => {
    return `INSERT INTO users (openid, user_name, user_avatar, phone_number, created_at)
    VALUES '${data.openid}','${data.user_name}','${data.user_avatar}','${data.phone_number}','${data.created_at}'`
}
const updateUserInfo = (key, value, openid) => {
    return `UPDATE users SET ${key} = '${value}' WHERE openid=${openid}`
}

export {
    selectOpenId,
    createUser,
    updateUserInfo
}