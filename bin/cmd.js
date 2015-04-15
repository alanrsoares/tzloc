#!/usr/bin/env node

var tztime = require('../');
var strftime = require('strftime');
var ctz = require('coordinate-tz');
var placename = require('placename');

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    alias: {
        s: 'src', d: 'dst', t: 'time',
        a: 'all', h: 'help'
    },
    boolean: [ 'all' ]
});
if (argv._[0] === 'tz') {
    placename(argv._[1], function (err, rows) {
        if (err) return cb(err);
        if (rows.length === 0) return cb(null, []);
        if (!argv.all) rows = [rows[0]];
        rows.forEach(function (row) {
            var name = ctz.calculate(row.lat, row.lon).timezone; 
            console.log(name);
        });
    });
    return;
}

if (argv._[0] === 'convert') argv._.shift();

if (argv._.indexOf('in') >= 0 || argv._.indexOf('to') >= 0) {
    argv._ = argv._.join(' ')
        .split(/\b(?:in|to|time)\b/i)
        .map(function (s) { return s.trim() })
        .filter(Boolean)
    ;
}

var timestr = argv.time || argv._.shift();
var src = argv.src || argv._.shift();
var dst = argv.dst || argv._.shift();

tztime(timestr, src, dst, function (err, times) {
    if (err) return error(err);
    
    var len = argv.all ? times.length : 1;
    if (argv.n !== undefined) len = argv.n;
    len = Math.min(times.length, len);
    for (var i = 0; i < len; i++) {
        var t = times[i];
        console.log([
            strftime('%F %T', t.date),
            t.dst.name,
            t.dst.adminCode,
            t.dst.country,
        ].filter(Boolean).join(' ').replace(/\s*\t\s*/g,'\t'));
    }
});

function error (err) {
    console.error(err);
    process.exit(1);
}
