const error_handler = (err,req,res,next)=>{

    let {status,message} = err;
    
    if(status==undefined) status = 400;
    if(message==undefined) message = "";

    console.error(err);

    res.status(status).json({status,message});

}

module.exports = error_handler;