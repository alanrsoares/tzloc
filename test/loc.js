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

test('london to moscow', function (t) {
    t.plan(4);
    tzloc('5:30 pm aug 22 1980', 'london', 'moscow', function (err, rows) {
        t.ifError(err);
        t.equal(strftime('%F %T', rows[0].date), '1980-08-22 19:30:00');
    });
    tzloc('19:30 aug 22 1980', 'moscow', 'london', function (err, rows) {
        t.ifError(err);
        t.equal(strftime('%F %T', rows[0].date), '1980-08-22 17:30:00');
    });
});
