const fs = require('fs');

const getEmails = function(done) {
    fs.readFile('BTC/users.json', (err, fileContent) => {
        if (err) {
            return done("Error reading file");
        }
        let emails = JSON.parse(fileContent.toString());
        return done(undefined, emails);
    })
}

const addEmail = function(email, done) {
    fs.readFile('BTC/users.json', (err, fileContent) => {
        if (err) {
            return done("Error reading file");
        }
        let emails = JSON.parse(fileContent.toString());
        let emailn = emails.find(emailn => emailn.email == email);
        if (emailn) {
            return done("Email already exists");
        }
        emails.push({"email": email});
        fs.writeFile('BTC/users.json', JSON.stringify(emails), (err) => {
            if (err) {
                return done("Error writing file");
            }
            return done(undefined, email);
        })
    })
}

module.exports = {
    getEmails,
    addEmail
}