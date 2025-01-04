import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import BinWrapper from '@xhmikosr/bin-wrapper';
import { getFilename } from './filename.js';
const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const url = `https://raw.githubusercontent.com/PruvoNet/gifsicle-bin/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}macos/arm64/gifsicle.macho`, 'darwin', 'arm64')
	.src(`${url}macos/x64/gifsicle.macho`, 'darwin', 'x64')
	.src(`${url}linux/arm64/gifsicle.elf`, 'linux', 'arm64')
	.src(`${url}linux/x64/gifsicle.elf`, 'linux', 'x64')
	.src(`${url}win/x64/gifsicle.exe`, 'win32', 'x64')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(getFilename());

export default binWrapper;