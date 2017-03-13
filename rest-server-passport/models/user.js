var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    firstname: {
<<<<<<< HEAD
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    admin:   {
=======
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
>>>>>>> 6d68095dae6617e860830ba7d97af043c0ff1ea8
        type: Boolean,
        default: false
    }
});

User.methods.getName = function () {
    return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
