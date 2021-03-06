//plug-in
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require("gulp-sass");
var browserSync = require('browser-sync');

//sass
gulp.task("sass", function() {
    return gulp.src('sass/*.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            indentType: 'tab',
            indentWidth: 2,
        }))
        .pipe(plumber())
        .pipe(gulp.dest("../src/css"));
});

//browser sync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "../src/",
            index: 'index.html'
        }
    })
})

//
//ブラウザリロード
//
gulp.task('bs-reload', function(done) {
    browserSync.reload();
    done();

});
//watch
gulp.task('watch', function() {
    gulp.watch('sass/*.scss', gulp.task('sass'));
    gulp.watch('sass/*.scss', gulp.task('bs-reload'));
    gulp.watch('pug/*.pug', gulp.task('bs-reload'));
});

gulp.task('default', gulp.parallel('sass', 'watch', 'browser-sync'));