var tzloc = require('./');
var strftime = require('strftime');

tzloc('3pm', 'tashkent', 'santiago', function (err, rows) {
    if (err) console.error(err);
    else console.log(strftime('%F %T', rows[0].date));
});
