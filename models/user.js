const getDb = require('../util/database').getDb;
const bcrypt = require('bcrypt');

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    async save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static async findOne(email, password) {
        const db = getDb();
        const user = await db.collection('users').findOne({ email: email});

        if (!user) {
            console.log('No user found with this email.');
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Password does not match.');
            return null;
        }

        return user;
    }
}

module.exports = User;