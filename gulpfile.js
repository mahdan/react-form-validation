var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    stringify = require('stringify');

/**
 * Removes all files generated by gulp.
 */
gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean({force: true}));
});

/**
 * Compiles JSX files into normal JavaScript.
 */
gulp.task('compile', ['clean'], function() {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .on('error', function(error) {
            console.error('failed to babelify code', error);
        })
        .pipe(gulp.dest('dist/js'));
});

/**
 * Copies static files to the dist directory.
 */
gulp.task('copy', ['clean'], function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/js'));
});

/**
 * Copies all the JavaScript files to text files so that they can be imported as text.
 */
gulp.task('textify', ['clean'], function() {
    return gulp.src(['src/**/*.js'])
        .pipe(rename(function(path) {
            path.extname = '.txt';
        }))
        .on('error', function(error) {
            console.error('failed to textify code', error);
        })
        .pipe(gulp.dest('dist/js'));
});

/**
 * Packages all files into one big JavaScript file usable in the browser.
 */
gulp.task('browserify', ['compile', 'copy', 'textify'], function() {
    return gulp.src('dist/js/index.js')
        .pipe(browserify({
            transform: [stringify(), 'babelify']
        }))
        .on('error', function(error) {
            console.error(error.stack.replace(/[ ]+at .*\n?/g, ''));
        })
        .pipe(rename('index.js'))
        .pipe(gulp.dest('dist'));
});

/**
 * Watch files in src and rebuild project if they change.
 */
gulp.task('watch', ['browserify'], function() {
    gulp.watch(['src/**/*'], ['browserify']);
});

/**
 * Default task.
 */
gulp.task('build', ['browserify']);
