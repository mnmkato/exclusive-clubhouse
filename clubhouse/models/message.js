const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    text: {type: String},
    author: {type: Schema.ObjectId, ref:"User"},
    created_at:{type: Date, default: Date.now}
})

module.exports = mongoose.model("Message", MessageSchema )