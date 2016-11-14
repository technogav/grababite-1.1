<<<<<<< HEAD
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
=======
var gulp = require('gulp'),
  buildConfig = require('./config/build.config'),
  concat = require('gulp-concat'),
  argv = require('minimist')(process.argv.slice(2)),
  footer = require('gulp-footer'),
  header = require('gulp-header'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  Server = require('karma').Server,
  karmaConf = require('./config/karma.conf.js'),
  rename = require('gulp-rename'),
  shell = require('gulp-shell'),
  prettify = require('gulp-prettify'),
  changelog = require('conventional-changelog'),
  q = require('q'),
  fs = require('fs'),
  jscs = require('gulp-jscs');

gulp.task('default', ['build']);

gulp.task('lint', ['jshint', 'jscs']);

gulp.task('build', function () {
  gulp.src(buildConfig.mockFiles)
    .pipe(concat('ng-cordova-mocks.js'))
    .pipe(header(buildConfig.closureStart))
    .pipe(footer(buildConfig.closureEnd))
    .pipe(header(buildConfig.banner))
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(uglify())
    .pipe(header(buildConfig.banner))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(buildConfig.dist));

  return gulp.src(buildConfig.pluginFiles)
    .pipe(concat('ng-cordova.js'))
    .pipe(header(buildConfig.closureStart))
    .pipe(footer(buildConfig.closureEnd))
    .pipe(header(buildConfig.banner))
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(gulp.dest(buildConfig.demo.ngCordova))
    .pipe(uglify())
    .pipe(header(buildConfig.banner))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(gulp.dest(buildConfig.demo.ngCordova));
});

gulp.task('changelog', function () {
  var version = buildConfig.versionData.version;
  var dest = 'CHANGELOG.md';
  return makeChangelog(version).then(function (log) {
    fs.writeFileSync(dest, log);
  });
});

function makeChangelog(version) {
  var file = __dirname + '/CHANGELOG.md';
  var deferred = q.defer();
  changelog({
    repository: 'https://github.com/driftyco/ng-cordova',
    version: version,
    file: file
  }, function (err, log) {
    if (err) deferred.reject(err);
    else deferred.resolve(log);
  });
  return deferred.promise;
}

gulp.task('karma', function (done) {
  karmaConf.singleRun = true;
  argv.browsers && (karmaConf.browsers = argv.browsers.trim().split(','));
  argv.reporters && (karmaConf.reporters = argv.reporters.trim().split(','));
  var server = new Server(karmaConf, done);
  server.start();
});

gulp.task('jshint', function () {
  return gulp.src('./src/plugins/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function () {
  gulp.src('src/plugins/*.js')
    .pipe(jscs({
      fix: true,
      "requireSpaceAfterKeywords": ['function']
    }))
    .pipe(gulp.dest('src/plugins/'));


  gulp.src('./src/mocks/*.js')
    .pipe(jscs({
      fix: true,
      "requireSpaceAfterKeywords": ['function']
    }))
    .pipe(gulp.dest('src/mocks/'));
});

gulp.task('karma-watch', function (done) {
  console.log(karmaConf);
  karmaConf.singleRun = false;
  var server = new Server(karmaConf, done);
  server.start();
});

gulp.task('watch', ['build'], function () {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['build']);
});


gulp.task('run-demo', ['watch'], shell.task([
  'cd demo &&  ionic run ios -l -c --target="iPhone (Retina 4-inch)"'
]));
>>>>>>> 6463412ad3d3dc91972db846c005aded841824ba
