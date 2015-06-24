var grunt = require("grunt");
var exec = require('child_process').exec;
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-express-server');
grunt.loadNpmTasks('grunt-env');
grunt.loadNpmTasks('grunt-release');
grunt.loadNpmTasks('grunt-version-check');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-mocha-istanbul');
grunt.loadNpmTasks('grunt-plato');
grunt.loadNpmTasks('grunt-api-benchmark');
grunt.loadNpmTasks('grunt-nvm');
grunt.loadNpmTasks('grunt-notify');
grunt.initConfig({
    watch: {
        scripts: {
            files: ['src/**/*.{js,json}', 'test/**/*.{js,json}', '*.js'],
            tasks: ['default'],
            options: {
                spawn: false
            }
        }
    },
    plato: {
        your_task: {
            files: {
                'report/plato': ['src/**/*.js']
            }
        }
    },
    jshint: {
        all: ['src/**/*.js', '*.js', 'test/**/*.js'],
        options: {
            undef: true,
            node:true,
            globals: {
                require: true,
                module: true,
                setTimeout: true,
                __dirname: true,
                process: true,
                it: true,
                describe: true,
                setInterval: true
            }
        }
    },
    api_benchmark: {
        track: {
            options: {
                output: 'report/benchmark'
            },
            files: {
                'api_benchmark.html': 'benchmark/config.json'
            }
        }
    },
    express: {
        debug:{
            options: {
                // Override defaults here
                debug: true,
                script: 'src/index.js'
            }
        },
        dev:{
            options: {
                script: 'src/index.js'
            }
        }
    },
    env: {
        dev: {
            NODE_ENV: "development",
            BLUEBIRD_DEBUG:1
        },
        prod: {
            NODE_ENV: "production"
        },
        test: {
            NODE_ENV: "test"
        },
        sandbox: {
            NODE_ENV: "sandbox"
        }
    },
    mochaTest: {
        jenkins: {
            options: {
                clearRequireCache: true,
                reporter: 'xunit',
                coverage: true,
                captureFile: './build/reports/mocha/xunit.xml',
                timeout: 30000
            },
            src: ['test/**/*.js']
        }
    },
    mocha_istanbul: {
        coverage: {
            src: 'tests/**', // a folder works nicely
            options: {
                excludes: ['src/log/*.js', 'src/conf/*.js', 'src/enums/*.js']
            }
        }
    },
    release: {
        options: {
            npm: false
        }
    }
});
grunt.registerTask('default', ['nvm:use:0.12','test:dev', 'server:dev', 'watch']);
grunt.registerTask('debug', ['test:dev', 'server:debug', 'watch']);
grunt.registerTask('test:dev', ['jshint:all', 'env:dev', 'mocha_istanbul']);
grunt.registerTask('test:jenkins', ['jshint:all', 'env:test', 'mochaTest:jenkins', 'mocha_istanbul']);
grunt.registerTask('server:debug', ['env:dev', 'express:debug']);
grunt.registerTask('server:dev', ['env:dev', 'express:dev']);
grunt.registerTask('buildJenkins', ['jshint:all', 'versioncheck','test:jenkins']);
grunt.registerTask('generateRelease', ['buildJenkins', 'release']);
