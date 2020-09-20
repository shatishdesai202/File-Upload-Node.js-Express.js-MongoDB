const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/image', {useNewUrlParser: true});

var conn = mongoose.Collection;

var schema = new mongoose.Schema({
    imagename:String
});

var model = mongoose.model('uploadImage', schema);

module.exports = model; 