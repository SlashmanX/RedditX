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
		win32: /win32/.test(inputPlatforms) || buildAll,
		win64: /win64/.test(inputPlatforms) || buildAll,
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
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', [
		'bower_clean',
		'jshint',
		'css',
	]);

	grunt.registerTask('build', [
		'default',
		'nodewebkit',
		'copy:ffmpeg'
	]);

	grunt.registerTask('css', [
		'less'
	]);

	grunt.registerTask('start', function() {
		var start = parseBuildPlatforms();
		if (start.win32) {
			grunt.task.run('exec:win32');
		} else if (start.win64) {
			grunt.task.run('exec:win64');
		}else if (start.mac) {
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

		less: {
			compile: {
				options: {
					compress: true,
					paths: ['src/less']
				},
				files: 
					{
						"src/css/app.css" : "src/less/app.less"
					}
			}

		},

		nodewebkit: {
			options: {
				version: '0.12.1',
				buildDir: './build/releases', // Where the build version of my node-webkit app is saved
				cacheDir: './build/cache',
				keep_nw: true,
				embed_nw: false,
				zip: buildPlatforms.win, // Zip nw for mac in windows. Prevent path too long if build all is used.
				mac: buildPlatforms.mac,
				win32: buildPlatforms.win32,
				win64: buildPlatforms.win64,
				linux32: buildPlatforms.linux32,
				linux64: buildPlatforms.linux64,
			},
			src: ['./src/**','./node_modules/**', '!./node_modules/bower/**', '!./node_modules/*grunt*/**', '!./node_modules/stylus/**',
				'!./**/test*/**', '!./**/doc*/**', '!./**/example*/**', '!./**/demo*/**', '!./**/bin/**', '!./**/build/**', '!./**/.*/**',
				'./package.json', './README.md', './LICENSE.txt'
			]
		},

		exec: {
			win32: {
				cmd: '"build/cache/<%= nodewebkit.options.version %>/win32/nw.exe" . --debug'
			},
			win64: {
				cmd: '"build/cache/<%= nodewebkit.options.version %>/win64/nw.exe" . --debug'
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
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: ['src/models/*.js', 'src/js/*.js', 'src/js/views/*.js','src/js/views/submission/*.js', 'src/js/views/submission/providers/*.js', 'src/providers/*.js', 'src/parsers/*.js']
			}
		},
		copy: {
			ffmpeg: {
				files: [
				{
					src: 'libraries/win/ffmpegsumo.dll',
					dest: 'build/releases/RedditX/win32/ffmpegsumo.dll',
					flatten: true
				},
				{
					src: 'libraries/win/ffmpegsumo.dll',
					dest: 'build/releases/RedditX/win64/ffmpegsumo.dll',
					flatten: true
				},
				{
					src: 'libraries/win/ffmpegsumo.dll',
					dest: 'build/cache/win32/<%= nodewebkit.options.version %>/ffmpegsumo.dll',
					flatten: true
				},
				{
					src: 'libraries/win/ffmpegsumo.dll',
					dest: 'build/cache/win64/<%= nodewebkit.options.version %>/ffmpegsumo.dll',
					flatten: true
				},
				{
					src: 'libraries/mac/ffmpegsumo.so',
					dest: 'build/releases/RedditX/osx/RedditX.app/Contents/Frameworks/node-webkit Framework.framework/Libraries/ffmpegsumo.so',
					flatten: true
				},
				{
					src: 'libraries/mac/ffmpegsumo.so',
					dest: 'build/cache/osx/<%= nodewebkit.options.version %>/node-webkit.app/Contents/Frameworks/node-webkit Framework.framework/Libraries/ffmpegsumo.so',
					flatten: true
				},
				{
					src: 'libraries/linux64/libffmpegsumo.so',
					dest: 'build/releases/RedditX/linux64/libffmpegsumo.so',
					flatten: true
				},
				{
					src: 'libraries/linux64/libffmpegsumo.so',
					dest: 'build/cache/linux64/<%= nodewebkit.options.version %>/libffmpegsumo.so',
					flatten: true
				},
				{
					src: 'libraries/linux32/libffmpegsumo.so',
					dest: 'build/releases/RedditX/linux32/libffmpegsumo.so',
					flatten: true
				},
				{
					src: 'libraries/linux32/libffmpegsumo.so',
					dest: 'build/cache/linux32/<%= nodewebkit.options.version %>/libffmpegsumo.so',
					flatten: true
				}
				]
			},
		}

	});

};