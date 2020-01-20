/*-------------------- plug-in --------------------------------- */
var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var sassGlob = require("gulp-sass-glob");
var packageImporter = require('node-sass-package-importer');
var imagemin = require('gulp-imagemin');
var changed  = require('gulp-changed');

/*-------------------- plug-in --------------------------------- */

/*-------------------- タスク ---------------------------------- */
//scssをコンパイル
var paths = {
  "scss": "scss/", //作業するscssのフォルダ
  "css": "dist/css/"  //コンパイルして保存するcssのフォルダ
}

gulp.task('scss', function() {
  return gulp.src(paths.scss + '**/*.scss')

  .pipe(sassGlob({
      ignorePaths: [
        'foundation/reset.css'
      ]
  }))

  .pipe(sass({outputStyle: "expanded"}))
  .pipe(gulp.dest(paths.css))
});

var imgpaths = {
  "srcDir": "images/", //作業する画像のフォルダ
  "dstDir": "dist/images"  //コンパイルして保存する画像のフォルダ
}

// jpg,png,gif画像の圧縮タスク
gulp.task('imagemin', (done) => {
  var srcGlob = imgpaths.srcDir + '/**/*.+(jpg|jpeg|png|gif)';
  var dstGlob = imgpaths.dstDir;
  gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
      ]
    ))
    .pipe(gulp.dest( dstGlob ));
    done();
});

gulp.task('watch', function(){
  gulp.watch(paths.scss + '**/*', gulp.task('scss'));
  gulp.watch(imgpaths.srcDir + '**/*', gulp.task('imagemin'));
});

gulp.task('default', gulp.task('watch'));
/*-------------------- /タスク --------------------------------- */
