'use strict';
const path = require('path');
const binBuild = require('bin-build');
const bin = require('.');
const fs = require('fs');

(async () => {
	try {
		await bin.run(['--version']);
		console.log('gifsicle pre-build test passed successfully');
	} catch (error) {
		console.warn(error.message);
		console.warn('gifsicle pre-build test failed');
		console.info('compiling from source');

		const config = [
			'./configure --disable-gifview --disable-gifdiff',
			`--prefix="${bin.dest()}/temp" --bindir="${bin.dest()}/temp"`,
		].join(' ');

		try {
			const source = path.resolve(__dirname, '../vendor/source/gifsicle-1.93.tar.gz');
			await binBuild.file(source, [
				'autoreconf -ivf',
				config,
				'make install',
			]);

			fs.renameSync(`${bin.dest()}/temp/gifsicle`, bin.path());
			console.log('gifsicle built successfully');
		} catch (error) {
			console.error(error.stack);

			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		}
	}
})();
