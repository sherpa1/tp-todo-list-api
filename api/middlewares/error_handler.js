const error_handler = (err,req,res,next)=>{
    console.error(err)
    if(err) return res.status(err.code).json({message:"error"});
    else next();
}

module.exports = error_handler;