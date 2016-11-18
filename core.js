'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

const path = require('path');
const url = require('url');

const fs = require('fs');

// --- Мои модули ---
const crypter = require('crypter');
const dbManager = require('dbManager');
const access = require('access');
// ---

let win;
let createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: 'view/assets/icons/favicon.ico'
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
                loadIndex();
            } else {
                dbManager.writeNewUser(user, () => {
                    dbManager.createDb(user.username);
                    access.provide();
                    loadIndex();
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
                access.provide();
                loadIndex();
                event.returnValue = true;
            } else {
                event.returnValue = 'i am here!!!';
            }
        });
    });
});

ipc.on('addNewTile', (event, arg) => {
    let encrypted = crypter.encryptTile(arg);
    dbManager.addTile(encrypted, crypter.secUser(), () => {});
});

ipc.on('getTiles', (event, arg) => {
    dbManager.getTiles(crypter.secUser(), (data) => {
        var decrypted = crypter.decryptTiles(data);
        event.returnValue = decrypted;
    });
});

ipc.on('removeTile', (event, arg) => {
    dbManager.removeTile(crypter.secUser(), arg);
});

ipc.on('saveChanges', (event, arg) => {
    let index = arg.index;
    let encrypted = crypter.encryptTile(arg.tile);

    dbManager.saveTile(crypter.secUser(), encrypted, index, () => {
        event.returnValue = true;
    });
});

ipc.on('logout', () => {
    access.close();
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/view/pages/login.html'),
        protocol: 'file:',
        slashes: true
    }));
});

// Внутренние функции
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

let loadIndex = () => {
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/view/index.html'),
        protocol: 'file:',
        slashes: true
    }));
}
