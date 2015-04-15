var test = require('tape');
var tzloc = require('../');
var strftime = require('strftime');

test('3pm in tashkent to santiag time', function (t) {
    t.plan(2);
    tzloc('3pm', 'tashkent', 'santiago', function (err, rows) {
        t.ifError(err);
        t.equal(strftime('%T', rows[0].date), '06:00:00');
    });
});
