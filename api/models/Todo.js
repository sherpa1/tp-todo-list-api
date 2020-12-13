const DBClient = require("../utils/DB/DBClient");
const User = require("./User");
const faker = require('faker');

class Todo extends DBClient {

    static query = "";
    static table = "todos";

    constructor() {
        super();
    }

    static async all(options = {}) {

        let fields = '*' || options.fields;

        Todo.query = `SELECT ${fields} FROM ${Todo.table}`;

        if (options.conditions) {
            Todo.query += ` ${options.conditions}`;
        }

        console.log(Todo.query);

        try {
            const results = await super.all(Todo.query);
            return results;
        } catch (error) {
            throw error;
        }

    }

    static async count(options = {}) {
       
        Todo.query = `SELECT COUNT(${Todo.table}.id) as count FROM ${Todo.table}`;
        
        if (options.conditions) {
            Todo.query += ` ${options.conditions}`;
        }

        console.log(Todo.query);

        try {
            const result = await super.one(Todo.query);
            return result.count;
        } catch (error) {
            throw error;
        }

    }



    static async one(options = {}) {

        let fields = '*' || options.fields;

        Todo.query = `SELECT ${fields} FROM ${Todo.table}`;

        if (options.conditions) {
            Todo.query += ` ${options.conditions}`;
        }

        if (options.order) {
            Todo.query += `ORDER by ${options.order}`;
        }

        console.log(Todo.query);

        try {
            const results = await super.one(Todo.query);
            return results;
        } catch (error) {
            throw error;
        }

    }

    static async populate() {

        let a_user;

        try {
            a_user = await User.one(`SELECT * ${Todo.table} LIMIT 1`);
            
            if(a_user==undefined){
                await User.populate();
                a_user = await User.one(`SELECT * ${Todo.table} LIMIT 1`);
            }
            
            const title = faker.lorem.sentence();
            const content = faker.lorem.paragraph();
            const user_id = a_user.id;
            const deadline = new Date();

            let sql =
            `INSERT INTO ${Todo.table} (title, content, user_id, created_at, done) 
        VALUES('${title}', '${content}', ${user_id}, NOW(), 0)`;

            try {
                await super.query(sql);
            } catch (error) {
                throw error;
            }

            return `Table "${Todo.table}" populated with success`;


        } catch (error) {
            throw error;
        }


    }
}

module.exports = Todo;