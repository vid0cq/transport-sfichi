const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest("src/css"))
		.pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/jquery-easing/dist/jquery.easing.1.3.umd.min.js'])
		.pipe(gulp.dest("src/js"))
		.pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {

	browserSync.init({
		server: "./src"  
	});

	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Fonts to src/fonts
gulp.task('fonts', function() {
	return gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('src/fonts'));
})

// Move Font Awesome CSS and flag-icon-css to src/css
gulp.task('css-third-party', function() {
	return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css','node_modules/flag-icon-css/css/flag-icon.min.css'])
		.pipe(gulp.dest('src/css'));
})

gulp.task('img-third-party', function() {
	return gulp.src(['node_modules/flag-icon-css/flags/4x3/gb.svg','node_modules/flag-icon-css/flags/4x3/ro.svg'])
		.pipe(gulp.dest('src/flags/4x3/'));
})

gulp.task('default', ['js','serve', 'css-third-party', 'img-third-party', 'fonts']);