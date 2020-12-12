const express = require("express");
const router = express.Router();

const validate_the_todo = require("../middlewares/todo/validate_the_todo");
const find_the_todo = require("../middlewares/todo/find_the_todo");

const hateoas = require("../utils/hateoas");

const { LOCAL_PORT, DIST_PORT, HOST } = require("../config/env");
const DBClient = require('../utils/DB/DBClient');
const Todo = require('../models/Todo');

let todos;

let all_items, one_item;

const table = 'todos';
const base_url = `${HOST}:${DIST_PORT}/${table}`;

router.use(validate_the_todo);

router.put("/", (req,res,next)=>{
    res.sendStatus(405);//method not allowed
});

router.patch("/", (req,res,next)=>{
    res.sendStatus(405);//method not allowed
});

router.patch("/:id", (req,res,next)=>{
    res.sendStatus(405);//method not allowed
});

router.delete("/", (req,res,next)=>{
    res.sendStatus(405);//method not allowed
});

router.post("/:id", (req,res,next)=>{
    res.sendStatus(405);//method not allowed
});

router.get("/", async (req, res,next) => {

    // try {
    //     const pop = await Todo.populate();
    // } catch (error) {
    //     console.error(error);
    //     return next({status:500,message:"DB Error"});
    // }

    try {
        todos = await Todo.all();
    } catch (error) {
        console.error(error);
        return next({status:500,message:"DB Error"});
    }

    res.status(200).json(
        {
            data: todos,
            links: hateoas(req,list=true)
        });
});

router.get("/:id", find_the_todo, (req, res,next) => {

    res.status(200).json(
        {
            data: res.the_todo,
            links: hateoas(req,self=true,list=true)
        });

});

router.put("/:id", find_the_todo, (req, res, next) => {

    res.the_todo.title = "Updated todo title";
    res.the_todo.content= "Updated todo content";

    res.status(200).json(
        {
            data: res.the_todo,
            links: hateoas(req,self=true,list=true)
        }
    );

});

router.post("/", (req, res, next) => {
    todos.push(res.the_todo);

    const new_id = 6;

    const new_url = `${req.originalUrl}/${new_id}`;

    res.location(new_url).status(201).json({data:res.the_todo,links:hateoas(req,list=true, self=true,url=new_url)});
});

router.delete("/:id", find_the_todo, (req, res, next) => {

    if(res.the_todo==undefined)
    return next({status:404,message:`Todo with id ${req.params.id} does not exist`});

    let the_index;

    try {        
        todos.forEach((todo, index) => {
            if (todo.id === res.the_todo.id) the_index = index;
        });

        if(the_index==undefined) next({ status: 404, message: `Todo with id ${id} does not exist` });
    } catch (error) {
        next({ status: 404, message: `Todo with id ${req.params.id} does not exist` });
    }

    try {
        todos.pop(the_index);
    } catch (error) {
        next({ status: 404, message: `Todo with id ${req.params.id} does not exist` });
    }

    res.sendStatus(204);

});

module.exports = router;