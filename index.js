var placename = require('placename');
var parse = require('parse-messy-time');
var ctz = require('coordinate-tz');
var offsets = require('timezone-name-offsets');

module.exports = function (timestr, a, b, cb) {
    var time = parse(timestr);
    var src, dst, pending = 2;
    
    placename(a, function (err, rows) {
        if (err) return cb(err);
        if (rows.length === 0) return cb(null, []);
        src = rows;
        if (-- pending === 0) done();
    });
    placename(b, function (err, rows) {
        if (err) return cb(err);
        if (rows.length === 0) return cb(null, []);
        dst = rows;
        if (-- pending === 0) done();
    });
    
    function done () {
        var matches = [];
        src.forEach(function (s) {
            s.tz = ctz.calculate(s.lat, s.lon).timezone;
            
            dst.forEach(function (d) {
                d.tz = ctz.calculate(d.lat, d.lon).timezone;
                matches.push({ src: s, dst: d });
            });
        });
        cb(null, matches.map(function (m) {
            var soff = offsets[m.src.tz];
            var doff = offsets[m.dst.tz];
            var d = new Date(time);
            d.setMinutes(soff - doff);
            return { src: m.src, dst: m.dst, date: time };
        }));
    }
};
