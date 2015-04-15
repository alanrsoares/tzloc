#!/usr/bin/env node

var tztime = require('../');
var strftime = require('strftime');
var ctz = require('coordinate-tz');
var placename = require('placename');
var offsets = require('timezone-name-offsets');
var has = require('has');
var fs = require('fs');
var path = require('path');

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    alias: {
        s: 'src', d: 'dst', t: 'time',
        a: 'all', v: 'verbose', h: 'help'
    },
    boolean: [ 'all' ]
});
if (argv.help || argv._[0] === 'help') {
    return fs.createReadStream(path.join(__dirname, 'usage.txt'))
        .pipe(process.stdout)
    ;
}
else if (argv._[0] === 'tz') {
    placename(argv._[1], function (err, rows) {
        if (err) return cb(err);
        if (rows.length === 0) return cb(null, []);
        if (argv.n !== undefined) rows = rows.slice(0, argv.n);
        else if (!argv.all) rows = [rows[0]];
        
        rows.forEach(function (row) {
            var name = ctz.calculate(row.lat, row.lon).timezone; 
            console.log(name);
        });
    });
    return;
}
else if (argv._[0] === 'offset') {
    var name = argv._[1];
    if (has(offsets, name)) return console.log(offsets[name]);
    placename(argv._.slice(1).join(' '), function (err, rows) {
        if (err) return cb(err);
        if (rows.length === 0) return cb(null, []);
        if (argv.n !== undefined) rows = rows.slice(0, argv.n);
        else if (!argv.all) rows = [rows[0]];
        
        rows.forEach(function (row) {
            var name = ctz.calculate(row.lat, row.lon).timezone; 
            if (argv.verbose) {
                console.log([
                    offsets[name],
                    row.name,
                    row.adminCode,
                    row.country
                ].join('\t'));
            }
            else console.log(offsets[name]);
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
        if (argv.verbose) {
            console.log([
                strftime('%F %T', t.date),
                [ t.src.name, t.src.adminCode, t.src.country ].join(' '),
                [ t.dst.name, t.dst.adminCode, t.dst.country ].join(' '),
            ].filter(Boolean).join('\t').replace(/\s*\t\s*/g,'\t'));
        }
        else console.log(strftime('%F %T', t.date));
    }
});

function error (err) {
    console.error(err);
    process.exit(1);
}
