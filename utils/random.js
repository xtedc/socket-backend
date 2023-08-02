const randomName = () => {
    const nameList = ['张三', '李四', '王五', '赵六', '刘权', '权狗', '张麻子']
    const randomInt = Math.floor(Math.random() * 6);
    return nameList[randomInt]
}
const randomAvatar = () => {
    const avatarList = [
        'https://avatars.githubusercontent.com/u/157494?s=64&v=4',
        'https://avatars.githubusercontent.com/u/67512?s=64&v=4',
        'https://avatars.githubusercontent.com/u/466761?s=64&v=4',
        'https://avatars.githubusercontent.com/u/319608?s=64&v=4',
        'https://avatars.githubusercontent.com/u/82634?s=64&v=4',
        'https://avatars.githubusercontent.com/u/787011?s=64&v=4',
        'https://avatars.githubusercontent.com/u/51479?s=60&v=4'
    ]
    const randomInt = Math.floor(Math.random() * 6);
    return avatarList[randomInt]
}
export {
    randomName,
    randomAvatar
}