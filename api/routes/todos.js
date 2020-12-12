const express = require("express");
const router = express.Router();
const validator = require('validator');

let todo;

const todo_validator = (req,res,next)=>{

    Date.prototype.yyyymmdd = function () {
        const mm = this.getMonth() + 1; // getMonth() is zero-based
        const dd = this.getDate();
    
        return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('-');
    };

    if(req.method==="POST"||req.method==="PUT"){
        todo = req.body;

        if(req.method==="POST"){
            if(todo.id!=undefined) delete(todo.id);
            if(todo.created_at!=undefined) delete(todo.created_at);
            todo.done = false;
        }

        if(validator.isEmpty(todo.title)){
            next({status:400,message:`todo title should not be empty`});
        }
        
        if(todo.deadline){
            if(!validator.isAfter(todo.deadline)){
                const date = new Date();
                next({status:400,message:`todo deadline should be after ${date.yyyymmdd()}, ${todo.deadline} given`});
            }
        }
        
        if(!todo.user_id>0){
            next({status:400,message:`todo user_id should not be empty`});
        }
  
        if(todo.id<1){
            next({status:400,message:`todo id should be greater than 0`});
        }

    }

    next();

}

router.use(todo_validator);


let todos = [
    {
        id:1,
        title:"Lorem ipsum dolor sit amet",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        done:false,
        deadline:null,
        created_at:"2020-12-10 23:00:00",
        updated_at:null,
        user_id:1
    },
    {
        id:2,
        title:"Consectetur adipiscing elit",
        content:"Maecenas tincidunt consequat commodo. Proin quam ante, venenatis ac eros et, scelerisque luctus odio.",
        done:false,
        deadline:null,
        created_at:"2020-12-10 23:10:00",
        updated_at:null,
        user_id:1
    },
    {
        id:3,
        title:"Nullam ullamcorper a mauris sit amet mattis. ",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        done:false,
        deadline:null,
        created_at:"2020-12-10 23:20:00",
        updated_at:null,
        user_id:1
    },
    {
        id:4,
        title:"Vestibulum magna elit, rhoncus eu sapien ut",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        done:false,
        deadline:"2020-12-11 09:10:00",
        created_at:"2020-12-10 23:30:00",
        updated_at:"2002-12-11 07:00:00",
        user_id:1
    },
    {
        id:5,
        title:"Faucibus accumsan magna.",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        done:true,
        deadline:null,
        created_at:"2020-12-10 23:40:00",
        updated_at:null,
        user_id:1
    },
];

let a_todo;

router.get("/", (req,res)=>{
    res.json(todos);
});

router.get("/:id", (req,res)=>{

    const {id} = req.params;

    try {
        [a_todo] = todos.filter(todo=>todo.id==id);
        if(a_todo===undefined) next(404);
        res.json(a_todo);
    } catch (error) {
        res.json({message:"No matching todo"});
    }

});

router.put("/:id", (req,res,next,todo)=>{

    const {id} = req.params;

    try {
        a_todo = todos.filter(todo=>todo.id==id);
        a_todo.title = "Updated todo";
        res.json(a_todo);
    } catch (error) {
        res.json({message:"No matching todo"});
    }

});

router.post("/", (req,res,next)=>{
    todos.push(todo);
    res.json(todo);
});

router.delete("/:id",(req,res)=>{

    const {id} = req.params;

    try {
        [a_todo] = todos.filter(todo=>todo.id===Number(id));
    } catch (error) {
        res.json({message:"No matching todo"});
    }

    let the_index;

    todos.forEach((todo,index)=>{
        if(todo.id===a_todo.id) the_index = index;
    });

    todos.pop(the_index);

    res.json(todos);

});

module.exports = router;