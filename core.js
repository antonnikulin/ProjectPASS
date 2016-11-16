'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

const path = require('path');
const url = require('url');

const crypter = require('crypter');
const dbManager = require('dbManager');
const access = require('access');

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

// События с фронта
ipc.on('registration', (event, arg) => {
    crypter.encryptUserData(arg, (username, password) => {
        let user = {
            username,
            password
        };

        dbManager.getUsers((arr) => {
            if (hasUser(user, arr)) {
                access.provide();
                win.loadURL(url.format({
                    pathname: path.join(__dirname, '/view/index.html'),
                    protocol: 'file:',
                    slashes: true
                }));
            } else {
                dbManager.writeNewUser(user, () => {
                    dbManager.createDb(user.username);
                    access.provide();
                    win.loadURL(url.format({
                        pathname: path.join(__dirname, '/view/index.html'),
                        protocol: 'file:',
                        slashes: true
                    }));
                });
            }
        });
    });
});

ipc.on('authorization', (event, arg) => {
    crypter.encryptUserData(arg, (username, password) => {
        let user = {
            username,
            password
        };

        dbManager.getUsers((arr) => {
            if (hasUser(user, arr)) {
                console.log('Has user');
                access.provide();
                win.loadURL(url.format({
                    pathname: path.join(__dirname, '/view/index.html'),
                    protocol: 'file:',
                    slashes: true
                }));
            } else {
                console.log('Denied');
            }
        });
    });
});

// Внутренние функции
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

let hasUser = (user, arr) => {
    let isEqual = false;

    arr.forEach((item) => {
        if (user.username == item.username &&
            user.password == item.password) {
            isEqual = true;
        }
    });

    return isEqual;
};
