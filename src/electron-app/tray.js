const { Tray } = require("electron");

const { getAssetPath } = require("./utilities");
const { createMenu } = require("./menu");

let tray;

function createTray(theme) {
	const menu = createMenu();

	tray = new Tray(getAssetPath(`tray-${theme}.png`));
	tray.setContextMenu(menu);
}

function setTrayTheme(theme) {
	tray.setImage(getAssetPath(`tray-${theme}.png`));
}

module.exports = {
	createTray,
	setTrayTheme
};
