const {HOST} = require("../config/env");

const hateoas = (req,self=false,list=false,url=null)=>{
    const links =[];

    if(self){
        links.push(                {
            rel: 'list',
            href: `${HOST}/${req.baseUrl}`,
            type: 'GET'
        });
    }

    if(list){

        const url_end = (url)? url : req.originalUrl;

        links.push(
            {
                rel: 'self',
                href: `${HOST}/${url_end}`,
                type: "GET"
            },
        );
    }
    
    return links;

}

module.exports = hateoas;