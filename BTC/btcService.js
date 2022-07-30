const btcDao = require('./btcDAO');

const getEmails = function(done) {
    btcDao.getEmails(done);
}

const addEmail = function(email, done) {
    btcDao.addEmail(email, done);
}

module.exports = {
    getEmails,
    addEmail
}