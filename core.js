'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipc;

const path = require('path');
const url = require('url');

let win;

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

ipc.on('do-some', () => {
    console.log('Ура! Я таки перехватил сообщение!');
});

function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 800
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/view/pages/login.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    });
}
