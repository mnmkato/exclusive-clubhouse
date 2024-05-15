const mongoose = require('mongoose')
const formatTimeSince = require("../utils/utils");

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    text: {type: String},
    author: {type: Schema.ObjectId, ref:"User"},
    created_at:{type: Date, default: Date.now}
})

MessageSchema.virtual('created_at_formatted').get(function() {
    return formatTimeSince(this.created_at);
  });

module.exports = mongoose.model("Message", MessageSchema )