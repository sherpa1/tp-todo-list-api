const to_mysql_datetime = (date)=>{
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

const now = ()=>{
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {to_mysql_datetime, now};