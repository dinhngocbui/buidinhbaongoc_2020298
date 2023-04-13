'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        useContentSize: true,
        width:800 , 
        height: 600,
        x: 10, 
        y:10,
        resizable: false,
        fullscreen: false

    
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', () => { mainWindow = null; });
});

function sayHello() {
    alert('Hello World');
}


function initialize() {
    video = window.document.querySelector('video');
    let errorCallback = (error) => {
        console.log(`There was an errot connecting to the video stream:
        ${error.message}`);
    };
    window.navigator.webkitGetUseMedia ({video:true}, (localMediaStream)=> {
    }, errorCallback);

    }

function takePhoto(){
    let canvas = window.document.querySelector('canvas');
    canvas.getContext('2d').drawImage(video, 0, 0,800,600);
    photoData = 
    canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/,'');
    dialog.showSaveDialog({
        title: "Save the photo",
        defaultPath: 'myvienameserestaurant.png',
        buttonLable: 'Save photo'
    }, savePhoto);
}
    
window.onload = initialize;

const gui = require('nw.gui');


const menuBar = new gui.Menu({type:'menubar'});
const fileMenu = new gui.MenuItem({label: 'File'});
const sayHelloMenuItem = new gui.MenuItem(
    {
        label: 'Say hello',
        click: () => {alert('Hello');}
    });
const quitAppMenuItem =  new gui.MenuItem(
    {
        label: 'Quit app',
        click: () => {process.exit(0);}
    });

const fileSubMenu = new gui.Menu();
fileSubMenu.append(sayHelloMenuItem);
fileSubMenu.append(quitAppMenuItem);

fileMenu.submenu = fileSubMenu;
menuBar.append(fileMenu);
gui.Window.get().menu = menuBar;