var gulp=require('gulp'),
    fs = require('fs-extra'),
    concat=require('gulp-concat'),
    uglify = require('gulp-uglify'),
    BUILD_JSON=require('./build.json'),
    BUILD_NAME='jquery.extensions.js',
    MIN_NAME='jquery.extensions.min.js',
    REPO_NAME='jquery extensions',
    DIST='./dist',
    MS='./node_modules/mutation-summary/src/mutation-summary.js';



gulp.task('default',function(){
    console.log(REPO_NAME + ' ..."tasks: gulp build|gulp minify"');
});

gulp.task('build',function(){
    copyMS();
    copyJquery();
    concatStream(BUILD_NAME)
        .pipe(gulp.dest(DIST));
});

gulp.task('minify',function(){
    minifyMS();
    minifyJquery();
    concatStream(MIN_NAME)
        .pipe(uglify())
        .pipe(gulp.dest(DIST));
});

function copyJquery(){
    gulp.src('./lib/jquery.js')
        .pipe(gulp.dest(DIST));
}

function minifyJquery(){
    return gulp.src('./lib/jquery.js')
        .pipe(concat('jquery.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DIST));
}

function copyMS(){
    gulp.src(MS)
        .pipe(gulp.dest(DIST));
}

function minifyMS(){
    return gulp.src(MS)
        .pipe(concat('mutation-summary.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DIST));
}

function srcStream(){
    return gulp.src(BUILD_JSON);
}

function concatStream(name){
    return srcStream()
        .pipe(concat(name))
}
