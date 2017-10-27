'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const babel = require('gulp-babel');

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/[^_]*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./html/res/css'))
});

gulp.task('templates', function () {
    return gulp.src('./src/tpl/**/*.jsx')
        .pipe(sourcemaps.init())
        .pipe(concat('templates.js'))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./html/res/tpl'))
})

gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./html/res/js'))
})

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass'])
    gulp.watch('./src/tpl/**/*.jsx', ['templates'])
    gulp.watch('./src/js/**/*.js', ['js'])
});

gulp.task('default', ['sass', 'templates', 'js'])