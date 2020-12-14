const express = require("express");
const router = express.Router();
const todos = require("../data/todos");

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

router.put("/:id", (req,res)=>{

    const {id} = req.params;

    try {
        a_todo = todos.filter(todo=>todo.id==id);
        a_todo.title = "Updated todo";
        res.json(a_todo);
    } catch (error) {
        res.json({message:"No matching todo"});
    }

});

router.post("/", (req,res)=>{
    todos.push(
        {
            id:6,
            title:"Faucibus accumsan magna.",
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            done:true,
            deadline:null,
            created_at:"2020-12-10 23:40:00",
            updated_at:null,
            user_id:1
        },
    );
    res.json(todos);
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