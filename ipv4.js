var exec = require('child_process').exec
exec('echo $(curl -s https://api.ipify.org)',
    function (error, stdout, stderr) {
        ip=console.log('\x1b[33m%s\x1b[0m','IPv4:' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
