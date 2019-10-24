/** @format */

import { app, BrowserWindow } from 'electron';
// import * as path from 'path';
// import * as url from 'url';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,

        webPreferences: {
            nodeIntegration: true,
            // preload: path.join(__dirname,'../../','src/renderers/pages/a/index.tsx')
        },
    });

    // and load the index.html of the app.
    // mainWindow.loadFile('index.html')
    const winURL =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:9080`
        : `file:///${__dirname}/index.html`;
    mainWindow.loadURL(winURL);
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    //     app.quit();
    // }
});

app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
