'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');
const { getFilename } = require('./filename');
const url = `https://raw.githubusercontent.com/PruvoNet/gifsicle-bin/v${pkg.version}/vendor/`;

module.exports = new BinWrapper()
	.src(`${url}macos/arm64/gifsicle.macho`, 'darwin', 'arm64')
	.src(`${url}macos/x64/gifsicle.macho`, 'darwin', 'x64')
	.src(`${url}linux/arm64/gifsicle.elf`, 'linux', 'arm64')
	.src(`${url}linux/x64/gifsicle.elf`, 'linux', 'x64')
	.src(`${url}win/x64/gifsicle.exe`, 'win32', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(getFilename());