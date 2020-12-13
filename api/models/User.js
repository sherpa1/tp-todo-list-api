const DBClient = require("../utils/DB/DBClient");
const faker = require('faker');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

class User extends DBClient {

    static query = "";
    static table = "users";

    constructor() {
        super();
    }

    static async count(options = {}) {
       
        User.query = `SELECT COUNT(${User.table}.id) as count FROM ${User.table}`;
        
        if (options.conditions) {
            User.query += ` ${options.conditions}`;
        }

        console.log(User.query);

        try {
            const result = await super.one(User.query);
            return result.count;
        } catch (error) {
            throw error;
        }

    }

    static async all(options = {}) {

        let fields = '*' || options.fields;

        User.query = `SELECT ${fields} FROM ${User.table}`;

        if (options.conditions) {
            User.query += ` ${options.conditions}`;
        }

        console.log(User.query);

        try {
            const results = await super.all(User.query);
            return results;
        } catch (error) {
            throw error;
        }

    }

    static async one(options = {}) {

        let fields = '*' || options.fields;

        User.query = `SELECT ${fields} FROM ${User.table}`;

        if (options.conditions) {
            User.query += ` ${options.conditions}`;
        }

        if (options.order) {
            User.query += `ORDER by ${options.order}`;
        }

        console.log(User.query);

        try {
            const results = await super.one(User.query);
            return results;
        } catch (error) {
            throw error;
        }

    }

    static async populate() {

        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();
        const email = faker.internet.email();
        const password = "AZERTY";

        let salt, hash;

        try {
            salt = await bcrypt.genSalt(saltRounds);
        } catch (error) {
            console.error(error);
            throw error;
        }

        try {
            hash = await bcrypt.hash(password, salt);
        } catch (error) {
            console.error(error);
            throw error;
        }

        try {
            await super.query(`INSERT INTO ${User.table} (email, password, firstname, lastname, created_at) VALUES ('${email}', '${hash}', '${firstname}', '${lastname}', NOW())`);
            return `Table "${User.table}" populated with success`;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
}

module.exports = User;