#!/usr/bin/env node

var tztime = require('../');
var strftime = require('strftime');

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    alias: {
        s: 'src', d: 'dst', t: 'time',
        a: 'all', h: 'help'
    },
    boolean: [ 'all' ]
});

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
            t.dst.name,
            t.dst.adminCode,
            t.dst.country,
            '\t',
            strftime('%F %T', t.date)
        ].filter(Boolean).join(' ').replace(/\s*\t\s*/g,'\t'));
    }
});

function error (err) {
    console.error(err);
    process.exit(1);
}
