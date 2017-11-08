///<reference path="../typings/tsd.d.ts" />
var fs = require('fs');

//讀取文件
fs.readFile('a.txt', 'utf-8', function (err, data) {
    console.log(data);

    var b = new Buffer(data, 'utf-8');
    console.log(b.toString());
});

//同步寫入
fs.writeFileSync('a.txt', 'bbbb', 'utf-8');

//附加
fs.appendFile('a.txt', 'ccccc');

//讀取文件信息

fs.stat('a.txt', function (err, stats) {
    if (err) {
        console.error(err);
    }
    else if (stats.isFile) {
        console.log('size:' + stats.size + 'editDate:' + stats.mtime);
    }
});


//stream
var rs = fs.createReadStream('a.txt', 'utf-8');
//data事件可能会有多次，每次传递的chunk是流的一部分数据
rs.on('data', chunk => {
    console.log('DATA:');
    console.log(chunk);
});
rs.on('end', function () {
    console.log('END');
})

var ws1 = fs.createWriteStream('a.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n', 'utf-8');
ws1.write('END.');
ws1.end();

//文件複製 pipe一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable
var rs2 = fs.createReadStream('a.txt');
var ws2 = fs.createWriteStream('b.txt');
rs2.pipe(ws2);