'use strict';
const process = require('node:process');

const FILENAME_LIST = {
	darwin: 'gifsicle.macho',
	linux: 'gifsicle.elf',
	win32: 'gifsicle.exe',
};

function getFilename() {
	const filename = FILENAME_LIST[process.platform];
	if (!filename) {
		throw new Error('Unsupported platform');
	}

	return filename;
};

module.exports = {
	getFilename,
};