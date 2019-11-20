const gulp = require("gulp");
const watch = require("gulp-watch");
const babel = require("gulp-babel");
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const gulpSequence = require('gulp-sequence');
const eslint = require('gulp-eslint');
//开发环境的gulp
gulp.task("builddev", () => {
    return watch('src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        return gulp.src('src/nodeuii/**/*.js')
            .pipe(babel({
                babelrc: false,
                "plugins": ["transform-es2015-modules-commonjs"]
            })).pipe(gulp.dest('dist'))
    })
});
//上线环境的Gulp
gulp.task("buildprod", () => {
    return gulp.src('./src/nodeuii/**/*.js')
        .pipe(babel({
            babelrc: false,
            ignore: ['./src/nodeuii/config/index.js'],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task("buildconfig", () => {//tree shaking
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(rollup({
            output: {
                format: "cjs"
            },
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ],
            input: './src/nodeuii/config/index.js'
        }))
        .pipe(gulp.dest('./dist'));
});
gulp.task("lint", () => {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
let _task = ["builddev"];
if (process.env.NODE_ENV == "production") {
    //_task = ["buildprod","buildconfig"];
    _task = gulpSequence("buildprod", "buildconfig");//拉平异步
}
if (process.env.NODE_ENV == "lint") {
    _task = ["lint"];
}
gulp.task("default", _task);