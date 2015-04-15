# tzloc

find the time in a place

# command example

```
$ tzloc 3pm in tashkent to santiago time
2015-04-15 06:00:00
$ tzloc 9:30 in oakland to nuuk time -v
2015-04-15 14:30:00 Oakland CA US   Nuuk 07 GL
$ tzloc 5:45pm nov 22 in yellowknife to melbourne time
2015-11-23 09:45:00
$ tzloc tz lensk
Asia/Yakutsk
$ tzloc offset lensk 
540
```

# api example

``` js
var tzloc = require('tzloc');
var strftime = require('strftime');

tzloc('3pm', 'tashkent', 'santiago', function (err, rows) {
    if (err) console.error(err);
    else console.log(strftime('%F %T', rows[0].date));
});
```

# usage

```
tzloc TIME SRC DST
tzloc TIME in SRC to DST (time)
tzloc -t TIME -s SRC -d DST

  Compute and print the time at DST when the time at SRC is TIME.
  
    -v --verbose  Show found source and destination.
  
  tzloc '5pm aug 20' 'beijing' 'seattle'
  tzloc 11am in wellington to nyc time

tzloc tz PLACE

  Print the IANA time zone for PLACE.

tzloc offset PLACE
tzloc offset TZNAME

  Print the timezone offset in minutes for TZNAME or the PLACE.

tzloc help

  Show this message.

OPTIONS for all commands with multiple rows of output:

  -a --all      Show all records, not just the first.
  -n COUNT      Show COUNT records.     
```

# methods

```
var tzloc = require('tzloc')
```

## tzloc(timestr, src, dst, cb)

Calculate the time in `dst` when the time in `src` is `timestr`.

All matches for the placename strings `src` and `dst` are provided as pairs in
`cb(err, rows)`.

Each row has `src`, `dst`, and `date` properties. The `src` and `date` values
are given by [placename](https://npmjs.org/package/placename) and augmented with
the computed timezone. Each row looks like this:

```
{ src: 
   { name: 'Tashkent',
     country: 'UZ',
     altCountry: '',
     muni: '',
     muniSub: '',
     featureClass: 'P',
     featureCode: 'PPLC',
     adminCode: '13',
     population: 1978028,
     lat: 41.26465,
     lon: 69.21627,
     from: 'tashkenti',
     tz: 'Asia/Almaty' },
  dst: 
   { name: 'Santiago',
     country: 'CL',
     altCountry: '',
     muni: '13101',
     muniSub: '',
     featureClass: 'P',
     featureCode: 'PPLC',
     adminCode: '12',
     population: 4837295,
     lat: -33.45694,
     lon: -70.64827,
     from: 'santiago',
     tz: 'America/Santiago' },
  date: Wed Apr 15 2015 06:00:00 GMT-0700 (PDT) }
```

# install

With [npm](https://npmjs.org), to get the command do:

```
npm install -g tzloc
```

and to get the library do:

```
npm install tzloc
```

# license

MIT
