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
                    './styles/css/style.css': './styles/less/style.less'
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
                  'styles/css/style.min.css': ['styles/css/style.css']
                }
            }
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
                tasks: ['less:test', 'lesslint'],
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    

    grunt.registerTask('default', ['newer:lesslint', 'less', 'cssmin', 'watch']);
};