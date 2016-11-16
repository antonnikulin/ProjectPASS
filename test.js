const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const path = require('path');

let win = new BrowserWindow({
    width: 300,
    height: 200
});

win.on('close', (event) => {
    win == null;
});
