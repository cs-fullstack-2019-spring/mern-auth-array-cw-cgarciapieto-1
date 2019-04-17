var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username:{type: String, required: true, max: 100},
        password:{type: String, required: true, max: 100},
    }
);

module.exports = mongoose.model('userModel', UserSchema);