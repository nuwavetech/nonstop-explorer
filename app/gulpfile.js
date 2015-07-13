
/* Load gulp and dynamically load plugins. */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'del'],
  replaceString: /\bgulp[\-.]/
});

var srcRoot = 'src';

var distRoot = 'www';
var dist = {
 root: distRoot,
 css: distRoot + '/css',
 icon: distRoot + '/img',
 img: distRoot + '/img',
 js: distRoot + '/js',
 html: distRoot + '/html',
 doc: './doc'
};

/* Tasks in alpha order. */
gulp.task('build', function() {
  gulp.start('vendor', 'js', 'css', 'img', 'icon', 'html');
});

gulp.task('clean', function(cb) {
  plugins.del([distRoot],cb);
});

gulp.task('css', function() {
  var src = [ srcRoot + '/**/*.css' ];
  var order = ['!**/app.styles.css', '*'];

  return gulp.src(src)
    .pipe(plugins.order(order))
    .pipe(plugins.concat('app.css'))
    .pipe(gulp.dest(dist.css));
});

gulp.task('default', function() {
  plugins.util.log('No default task. Try \'build\' or \'server\'.');
});

gulp.task('html', function() {

  var src = [srcRoot + '/**/*.html'];
  var filter;

  return gulp.src(src)
    .pipe(plugins.rename({dirname: ''}))
    .pipe((filter = plugins.filter(['*', '!index.html'])))
    .pipe(gulp.dest(dist.html))
    .pipe(filter.restore())
    .pipe((filter = plugins.filter(['index.html'])))
    .pipe(gulp.dest(dist.root))
});

gulp.task('icon', function() {
  var src = [srcRoot + '/**/icons/*.svg'];

  return gulp.src(src)
    .pipe(plugins.rename({dirname: ''}))
    .pipe(gulp.dest(dist.icon));
});

gulp.task('img', function() {
  var src = [srcRoot + '/**/*.png', srcRoot + '/**/*.jpg', srcRoot + '/**/*.ico'];
  var filter;

  return gulp.src(src)
    .pipe(plugins.rename({dirname: ''}))
    .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe((filter = plugins.filter(['*', '!favicon.ico'])))
    .pipe(gulp.dest(dist.img))
    .pipe(filter.restore())
    .pipe((filter = plugins.filter(['favicon.ico'])))
    .pipe(gulp.dest(dist.root))
});

gulp.task('js', function() {

  var src = srcRoot + '/**/*.js';
  var order = ['**/content/**', '**/app.module.js', '**/*module*', '*'];

  return gulp.src(src)
    .pipe(plugins.order(order))
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(dist.js));
});

gulp.task('minify', function() {

  var filter;

  return gulp.src(dist.root + '/**/*.*')
    .pipe((filter = plugins.filter('**/*.html')))
    .pipe(plugins.minifyHtml())
    .pipe(gulp.dest(dist.root))
    .pipe(filter.restore())
    .pipe((filter = plugins.filter('**/*.css')))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(dist.root))
    .pipe(filter.restore())
    .pipe((filter = plugins.filter('**/*.js')))
    .pipe(plugins.stripDebug())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(dist.root));

});

gulp.task('server', ['build', 'watch'], function() {
  gulp.src(dist.root)
    .pipe(plugins.webserver({
      livereload: { enable: true, port: 35729 },
      directoryListing: false,
      open: false,
      port:8000
    }));
});

gulp.task('vendor', function() {
  var cssFilter = plugins.filter('*.css');
  var jsFilter = plugins.filter('*.js');

  return gulp.src(plugins.mainBowerFiles())
    .pipe(jsFilter)
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(dist.js))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(plugins.concat('vendor.css'))
    .pipe(gulp.dest(dist.css));
});

gulp.task('watch', function() {

  gulp.watch(srcRoot + '/**/*.js', [ 'js' ]);
  gulp.watch(srcRoot + '/**/*.css', [ 'css' ]);
  gulp.watch([srcRoot + '/**/*.png', srcRoot + '/**/*.jpg'], [ 'img' ]);
  gulp.watch(srcRoot + '/**/icons/*.svg', [ 'icon' ]);
  gulp.watch(srcRoot + '/**/*.html', [ 'html' ]);
  gulp.watch(srcRoot + '/*.*', [ 'root' ]);

});
