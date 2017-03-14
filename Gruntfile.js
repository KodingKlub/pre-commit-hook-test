module.exports = function(grunt) 
{
    grunt.initConfig(
    {
        less:
        {
            test:
            {
                options:
                {
                    compress: false
                },
                files:
                {
                    './public/css/style.css': './styles/less/style.less'
                }
            }
        },
        lesslint:
        {
            src: ['./styles/less/**/*.less'],
            options: {
                csslint: {
                    'known-properties': false,
                    csslintrc: 'lint-config/.csslintrc'
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                  'public/css/style.min.css': ['public/css/style.css']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'js/**/*.js']
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: false
                },
                files: {
                    'public/js/main.min.js': ['js/main.js'],
                },
            },
        },
        watch: {
            reload:
            {
                files: ['./js/**/*.js'],
                tasks: [],
                options:
                {
                    livereload: true
                }
            },
            less:
            {
                files: ['./styles/less/**/*.less'],
                tasks: ['newer:less:test', 'newer:lesslint'],
                options:
                {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-lesslint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    

    grunt.registerTask('default', ['lesslint', 'less', 'cssmin', 'jshint', 'uglify', 'watch']);
    grunt.registerTask('pre-commit', ['lesslint', 'newer:less', 'newer:cssmin', 'jshint', 'newer:uglify']);
};