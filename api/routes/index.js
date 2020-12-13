const express = require("express");
const router = express.Router();

router.all('/', async (req, res, next) => {
    res.json(
        {
            message:"Welcome to the Todo List API", 
            endpoints:
                        [
                            {
                                ressource:"Todo",
                                collection:"todos",
                                uri:"http://localhost:3000/todos"
                            },
                        ]
        }
    );
})

module.exports = router;