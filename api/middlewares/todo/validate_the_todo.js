const validator = require('validator');
const {to_mysql_datetime} = require('../../utils/DB/MySQLDatetime');
const validate_the_todo = (req, res, next) => {

    Date.prototype.yyyymmdd = function () {
        return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('-');
    };

    if (req.method === "POST" || req.method === "PUT") {
        res.the_todo = req.body;

        if (req.method === "POST") {
            if (res.the_todo.id != undefined) delete (res.the_todo.id);
            if (res.the_todo.created_at != undefined) delete (res.the_todo.created_at);
            res.the_todo.done = false;
        }

        if (validator.isEmpty(res.the_todo.title)) {
            return next({ status: 400, message: `todo title should not be empty` });
        }

        if (res.the_todo.deadline) {
            if (!validator.isAfter(res.the_todo.deadline)) {
                const date = new Date();
                return next({ status: 400, message: `todo deadline should be after ${date.yyyymmdd()}, ${res.the_todo.deadline} given` });
            }else{
                const mysql_datetime = to_mysql_datetime(res.the_todo.deadline);//format JS Datetime to MySQL Datetime

                res.the_todo.deadline = mysql_datetime;
            }
        }

        if (!res.the_todo.user_id > 0) {
            return next({ status: 400, message: `todo user_id should not be empty` });
        }

        if (res.the_todo.id < 1) {
            return next({ status: 400, message: `todo id should be greater than 0` });
        }

    }

    next();

}

module.exports = validate_the_todo;