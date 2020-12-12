const todos = require("../../data/todos");

const find_the_todo = (req,res,next)=>{

    const { id } = req.params;
    if(id==undefined) next({status:400,message:"Missing id param"});
    if(id<1) return next({status:400,message:"Bad id param"});

    try {
        [res.the_todo] = todos.filter(todo => todo.id == id);

        if(res.the_todo==undefined)
        return next({ status: 404, message: `Todo with id ${id} does not exist` });
    
    } catch (error) {
        return next({ status: 404, message: `Todo with id ${id} does not exist` });
    }

    next();
}

module.exports = find_the_todo;