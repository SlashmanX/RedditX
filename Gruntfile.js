var parseBuildPlatforms = function(argumentPlatform) {
	// this will make it build no platform when the platform option is specified
	// without a value which makes argumentPlatform into a boolean
	var inputPlatforms = argumentPlatform || process.platform + ";" + process.arch;

	// Do some scrubbing to make it easier to match in the regexes bellow
	inputPlatforms = inputPlatforms.replace("darwin", "mac", "osx");
	inputPlatforms = inputPlatforms.replace(/;ia|;x|;arm/, "");

	var buildAll = /^all$/.test(inputPlatforms);

	var buildPlatforms = {
		mac: /mac/.test(inputPlatforms) || buildAll,
		win: /win/.test(inputPlatforms) || buildAll,
		linux32: /linux32/.test(inputPlatforms) || buildAll,
		linux64: /linux64/.test(inputPlatforms) || buildAll
	};

	return buildPlatforms;
};

module.exports = function(grunt) {
	"use strict";

	var buildPlatforms = parseBuildPlatforms(grunt.option('platforms'));
	var pkgJson = grunt.file.readJSON('package.json');
	var currentVersion = pkgJson.version;

	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-bower-clean');

	grunt.registerTask('default', [
		'jshint',
		'bower_clean',
	]);

	grunt.registerTask('build', [
		'bower_clean',
		'nodewebkit'
	]);

	grunt.registerTask('start', function() {
		var start = parseBuildPlatforms();
		if (start.win) {
			grunt.task.run('exec:win');
		} else if (start.mac) {
			grunt.task.run('exec:mac');
		} else if (start.linux32) {
			grunt.task.run('exec:linux32');
		} else if (start.linux64) {
			grunt.task.run('exec:linux64');
		} else {
			grunt.log.writeln('OS not supported.');
		}
	});

	grunt.initConfig({

		stylus: {
			compile: {
				options: {
					'resolve url': true,
					use: ['nib'],
					compress: false,
					paths: ['src/app/styl']
				},
				expand: true,
				cwd: 'src/app/styl',
				src: '*.styl',
				dest: 'src/app/themes/',
				ext: '.css'
			}

		},

		nodewebkit: {
			options: {
				version: '0.10.5',
				buildDir: './build/releases', // Where the build version of my node-webkit app is saved
				cacheDir: './build/cache',
				keep_nw: true,
				embed_nw: false,
				zip: buildPlatforms.win, // Zip nw for mac in windows. Prevent path too long if build all is used.
				mac: buildPlatforms.mac,
				win: buildPlatforms.win,
				linux32: buildPlatforms.linux32,
				linux64: buildPlatforms.linux64,
			},
			src: ['./src/**', '!./src/app/styl/**',
				'./node_modules/**', '!./node_modules/bower/**', '!./node_modules/*grunt*/**', '!./node_modules/stylus/**',
				'!./**/test*/**', '!./**/doc*/**', '!./**/example*/**', '!./**/demo*/**', '!./**/bin/**', '!./**/build/**', '!./**/.*/**',
				'./package.json', './README.md', './LICENSE.txt'
			]
		},

		exec: {
			win: {
				cmd: '"build/cache/<%= nodewebkit.options.version %>/win/nw.exe" . --debug'
			},
			mac: {
				cmd: 'build/cache/<%= nodewebkit.options.version %>/osx/node-webkit.app/Contents/MacOS/node-webkit . --debug'
			},
			linux32: {
				cmd: '"build/cache/<%= nodewebkit.options.version %>/linux32/nw" . --debug'
			},
			linux64: {
				cmd: '"build/cache/<%= nodewebkit.options.version %>/linux64/nw" . --debug'
			},
		},

		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/app/.jshintrc'
				},
				src: ['src/app/lib/*.js', 'src/app/lib/**/*.js', 'src/app/*.js']
			}
		},

	});

};