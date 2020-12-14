const express = require("express");
const router = express.Router();
const {HOST} = require("../config/env");

router.all('/', async (req, res, next) => {

    console.log(`App seen ${req.session.views['/']} times`);

    res.json(
        {
            message:"Welcome to the Todo List API", 
            endpoints:
                        [
                            {
                                ressource:"Todo",
                                collection:"todos",
                                uri:`${HOST}/todos`
                            },
                        ]
        }
    );
})

module.exports = router;