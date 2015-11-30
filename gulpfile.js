var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

//
// compile sass stylesheets
//
gulp.task('sass', function(){
	return sass('./styles/sass/main.scss', {
		style: 'compressed'
	})
  .pipe(gulp.dest('styles'))
  .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src('./js/src/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./js/dist/'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/dist/'));
})
// start static server
// and browsersync
gulp.task('serve', function () {
    browserSync.init({
        server: "./"
    });

    gulp.watch("./styles/sass/*.scss", [ 'sass' ])
    gulp.watch("./js/src/*.js",  [ 'js' ]);
    gulp.watch("./js/dist/bundle.js").on("change", browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload); 
})

gulp.task('build', [ 'sass', 'js', 'serve']);

gulp.task('default', ['serve'])
