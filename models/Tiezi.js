const mongoose =  require('mongoose');

module.exports = mongoose.model("Tiezi",{
    nickName: String,
    avatarUrl: String,
    content: String,
    serverPics: [String],
    time: Date
})

