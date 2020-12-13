const Todo = require("../../models/Todo");

const find_the_todo = async (req,res,next)=>{

    const { id } = req.params;

    if(id==undefined) next({status:400,message:"Missing id param"});
    if(id<1) return next({status:400,message:"Bad id param"});

    try {
        res.the_todo = await Todo.one({conditions:` WHERE id = ${id}`});
    } catch (error) {
        throw new Error(error);
    }

    if(res.the_todo==undefined)
    return next({ status: 404, message: `Todo with id ${id} does not exist` });


    next();
}

module.exports = find_the_todo;