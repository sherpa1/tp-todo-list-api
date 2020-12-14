Date.prototype.yyyymmdd = function () {
    const mm = this.getMonth() + 1; // getMonth() is zero-based
    const dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
};

Date.prototype.hhmmss = function () {
    const hh = this.getHours();
    const mm = this.getMinutes();
    const dd = this.getSeconds();

    return [
    (hh > 9 ? '' : '0') + hh,
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join(':');
};

const logger = (req, res, next) => {
    const date = new Date();
    console.log(`${date.yyyymmdd()} ${date.hhmmss()} : ${req.method} ${req.path}`);
    next();
}

module.exports = logger;