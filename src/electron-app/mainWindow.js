const { app, shell, BrowserWindow, globalShortcut } = require("electron");
const localShortcut = require("electron-localshortcut");
const path = require("path");

const { createPreferencesWindow } = require("./preferences");
const { getAssetPath, getLocalLicenseInformation, isTrialExpired } = require("./utilities");

global.mainWindow = undefined;

async function toggleWindow() {
	if (!global.mainWindow) {
		createWindow();
		return;
	}

	if (global.mainWindow.isVisible() && global.mainWindow.isFocused()) {
		if (process.platform === "darwin") {
			app.hide();
		}

		global.mainWindow.hide();

		return;
	}

	if (process.platform === "darwin") {
		app.show();
	}

	global.mainWindow.setAlwaysOnTop(true);
	global.mainWindow.show();
	global.mainWindow.setAlwaysOnTop(false);
	global.mainWindow.focus();
	app.focus();
	global.mainWindow.webContents.send("window-shown");

	const trialExpired = await isTrialExpired();
	if (trialExpired) {
		global.mainWindow.webContents.send("trial-expired");
	}
}

async function createWindow () {
	const queryString = await getLocalLicenseInformation();
	const windowUrl = process.env.NODE_ENV === "development"
		? `http://localhost:8080/index.html${queryString}`
		: `file://${path.resolve(__dirname, "..", "vue-app")}/index.html${queryString}`;

	global.mainWindow = new BrowserWindow({
		width: 800,
		height: 800,
		frame: true,
		show: false,
		resizable: true,
		movable: true,
		icon: getAssetPath("icon.png"),
		webPreferences: {
			nodeIntegration: true,
			webSecurity: process.env.NODE_ENV !== "development",
			devTools: process.env.NODE_ENV === "development",
		}
	});

	global.mainWindow.setAutoHideMenuBar(true);

	// Events
	global.mainWindow.on("blur", () => {

		globalShortcut.unregister("CommandOrControl+R");
		globalShortcut.unregister("F5");
	});

	global.mainWindow.on("focus", async () => {
		globalShortcut.registerAll(["CommandOrControl+R", "F5"], () => {});

		const trialExpired = await isTrialExpired();
		if (trialExpired) {
			global.mainWindow.webContents.send("trial-expired");
		}
	});
	global.mainWindow.on("close", () => localShortcut.unregisterAll(global.mainWindow));
	global.mainWindow.on("closed", () => global.mainWindow = null);
	global.mainWindow.once("ready-to-show", () => global.mainWindow.show());

	global.mainWindow.webContents.on("new-window", function(event, url) {
		event.preventDefault();

		if (url.includes("//localhost")) {
			return;
		}

		shell.openExternal(url);
	});

	localShortcut.register(global.mainWindow, "CmdOrCtrl+,", createPreferencesWindow);

	// Open the DevTools.
	if(process.env.NODE_ENV === "development") {
		global.mainWindow.webContents.openDevTools();

		require("devtron").install();
		require("vue-devtools").install();
	}

	global.mainWindow.focus();
	await global.mainWindow.loadURL(windowUrl);
}

module.exports = {
	toggleWindow,
	createWindow,
};
