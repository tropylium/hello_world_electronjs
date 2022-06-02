const {app, BrowserWindow} = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 500,
        maxWidth: 600,
        minWidth: 600,
        maxHeight: 500,
        minHeight: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html').then(() => {

    });

    win.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});