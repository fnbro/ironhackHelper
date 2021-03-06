const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    created_by: String,
    news_type: String,
    news_headline: String,
    news_content: String
});

const News = mongoose.model('News', NewsSchema);
module.exports = News;