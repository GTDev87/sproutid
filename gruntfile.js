module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jasmine: {
			browserGlobal: {
				src: ['./build/sproutid.js'],
				options: {
					specs: './spec/**/*.spec.js'
				}
			},
			browserAMD: {
				src: ['./build/sproutid.js'],
				options: {
					specs: './spec/**/*.spec.js',
					template: require('grunt-template-jasmine-requirejs')
				}
			}
		},
		jasmine_node: {
			specNameMatcher: 'spec',
			projectRoot: './spec/'
		},
		browserify: {
			all: {
				src: './src/sproutid.js',
				dest: './build/sproutid.js',
				options: {
					transform: ['debowerify', 'decomponentify', 'deamdify', 'deglobalify'],
					standalone: "sproutid"
				},
			},
		},
	});
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-jasmine-node');

	return grunt.registerTask('default', ['browserify', 'jasmine_node', 'jasmine:browserGlobal', 'jasmine:browserAMD']);
}

