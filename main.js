const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron')

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
	});
	
	mainWindow.loadURL('http://apps2.johorport.com.my/log-in.php');
	//mainWindow.webContents.openDevTools({mode: 'detach'});
	
	let tray = null;
	tray = new Tray(nativeImage.createFromPath(`${__dirname}/tray.png`).resize({width: 25, height: 17}));
	
	const menu = Menu.buildFromTemplate([
       {
           label: 'Restart app',
           type: 'normal',
           click() {
               app.relaunch();
               app.exit();
           },
       },
       {
           label: 'Quit app',
           accelerator: 'Cmd+Q',
           click() {
               app.quit();
           },
       },
   ])
 
   tray.setToolTip('UCUA');
   tray.setContextMenu(menu);
};

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
