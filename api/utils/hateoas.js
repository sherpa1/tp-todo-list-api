const hateoas = (req,self=false,list=false,url=null)=>{
    const links =[];

    if(self)
    links.push(                {
        rel: 'list',
        href: req.baseUrl,
        type: 'GET'
    });

    if(list)
    links.push(
        {
            rel: 'self',
            href: (url)? url : req.originalUrl,
            type: "GET"
        },
    );
    
    return links;

}

module.exports = hateoas;