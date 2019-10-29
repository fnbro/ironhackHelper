const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create an object to create, read, update and delete asset data in the MongoDB

let Feedback = new Schema({
    //we do not need to define the _id to identify the asset, mongoose does this automatically
    submitted_by: { type: Schema.Types.ObjectId, ref: 'User' },
    feedback_week: Number,
    feedback_satisfied: Number,
    feedback_happy: [],
    feedback_unhappy: [],
    feedback_comments: String
});

module.exports = mongoose.model('Feedback', Feedback);