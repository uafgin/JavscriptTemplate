module.exports = function (grunt) {
    grunt.initConfig({
        pgk: grunt.file.readJSON('package.json'),
        clean: {
            build: ['build/temp'],
            dist: ['dist/*']
        },
        exorcise: {
            all: {
                options: {},
                files: {
                    'build/temp/bundle.debug.js.map': ['build/temp/bundle.debug.js']
                }
            }
        },
        browserify: {
            all: {
                files: {
                    'build/temp/bundle.debug.js': ['src/app.js']
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    plugin: [
                        ['browserify-derequire']
                    ],
                    transform: [
                        [
                          "babelify",
                          {
                            "presets": [
                              "@babel/preset-env"
                            ]
                          }
                        ]
                      ]
                }
            },
            watch: {
                files: {
                    'build/temp/bundle.debug.js': ['src/app.js']
                },
                tasks: ['dist'],
                options: {
                    watch: true,
                    keepAlive: true,
                    tasks: ['dist'],
                    browserifyOptions: {
                        debug: true
                    },
                    plugin: [
                        ['browserify-derequire']
                    ],
                    transform: [
                        [
                          "babelify",
                          {
                            "presets": [
                              "@babel/preset-env"
                            ]
                          }
                        ]
                      ]
                }
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true,
                sourceMapRoot: './src/'
            },
            build_all: {
                options: {
                    sourceMapIn: 'build/temp/bundle.debug.js.map'
                },
                files: {
                    'build/temp/bundle.min.js': ['build/temp/bundle.debug.js']
                }
            }
        },
        copy: {
            dist: {
                expand: true,
                cwd: 'src/',
                src: [
                    '{,*/}*.html'
                ],
                dest: 'dist/'
            },
            routes: {
                expand: true,
                cwd: 'src/Route/',
                src: ['{,*/}*.html'],
                dest: 'dist/'
            },
            map: {
                expand: true,
                cwd: 'build/temp/',
                src: ['bundle.debug.js.map','bundle.debug.js','bundle.min.js'],
                dest: 'dist/'
            }
        },
        watch: {
            dev: {
                files: 'build/temp/bundle.debug.js',
                options: { spawn: false },
                tasks: ['exorcise:all','copy:map']
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('build', ['clean','browserify:all','exorcise:all','uglify:build_all','copy','clean:build']);
    grunt.registerTask('livecompile', ['browserify:watch']);
    grunt.registerTask('livecopy', ['watch:dev']);
};