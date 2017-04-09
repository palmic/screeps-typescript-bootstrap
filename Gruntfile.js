module.exports = function (grunt) {

	var dirs = {
		dist: "./dist",
		tests: "./tests"
	}

	var secrets  = require("./.secrets.js");

	grunt.loadNpmTasks("grunt-shell");
	grunt.loadNpmTasks("grunt-screeps");

	grunt.initConfig({
		shell: {
			options: {
				execOptions: {
					stdinRawMode: true
				}
			},
			tsc: {
				command: "mkdir -p "+dirs.dist+" && rm -rf "+dirs.dist+"/* && tsc --outFile "+dirs.dist+"/main.js"
			},
			cleandist: {
				command: "rm -rf "+dirs.dist+""
			},
			test: {
				command: [
					"tsc --outFile "+dirs.tests+"/tests.js "+dirs.tests+"/tests.ts",
					"mocha --colors "+dirs.tests+"/tests.js",
					"rm -rf "+dirs.tests+"/tests.js"
				].join(" && ")
			}
		},
		screeps: {
			options: {
				email: secrets.email,
				password: secrets.password,
				branch: secrets.branch,
				ptr: false
			},
			dist: {
				src: [dirs.dist + "/*.js"]
			}
		}
	});

	grunt.registerTask("test", ["shell:test"]);
	grunt.registerTask("default", ["test", "shell:tsc", "screeps", "shell:cleandist"]);
}
