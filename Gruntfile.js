'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: {
                    except: ['Prototype']
                }
            },
            dist: {
                files: {
                    'dist/menuHarmony.min.js': ['menuHarmony.js'],
                    'dist/menuTab.min.js': ['menuTab.js'],
                    'dist/carouselImg.min.js': ['carouselImg.js'],
                    'dist/intervalInputs.min.js': ['intervalInputs.js'],
                    'dist/canvasFingerprint.min.js': ['canvasFingerprint.js']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {src: 'menuHarmony.js', dest: 'dist/menuHarmony.js'},
                    {src: 'menuTab.js', dest: 'dist/menuTab.js'},
                    {src: 'carouselImg.js', dest: 'dist/carouselImg.js'},
                    {src: 'intervalInputs.js', dest: 'dist/intervalInputs.js'},
                    {src: 'canvasFingerprint.js', dest: 'dist/canvasFingerprint.js'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dist', ['uglify:dist', 'copy:dist']);

};
