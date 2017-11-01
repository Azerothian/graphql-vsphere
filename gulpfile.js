"use strict"; //eslint-disable-line
require("babel-core/register");
const gulp = require("gulp");
const eslint = require("gulp-eslint");
const del = require("del");
const mocha = require("gulp-mocha");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const dotenv = require("dotenv");
const jest = require("gulp-jest").default;

gulp.task("clean", () => {
  return del(["build/**/*"]);
});

gulp.task("lint", ["clean"], () => {
  return gulp.src(["src/**/*.js"])
    .pipe(eslint({
      fix: true,
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task("compile:publish", ["lint"], () => {
  return gulp.src(["src/**/*"])
    .pipe(sourcemaps.init())
    .pipe(babel({
      "presets": [
        "stage-0",
        ["env", {
          "targets": {
            "node": "8.9.0",
          },
          "useBuiltIns": true,
        }],
      ]})
    )
    .pipe(sourcemaps.write(".", {includeContent: false, sourceRoot: "../src/"}))
    .pipe(gulp.dest("build/"));
});
gulp.task("compile", ["lint"], () => {
  return gulp.src(["src/**/*"])
    .pipe(sourcemaps.init())
    .pipe(babel({
      "presets": [
        "stage-0",
        ["env", {
          "targets": {
            "node": "8.9.0",
          },
          "useBuiltIns": true,
        }],
      ]})
    )
    .pipe(sourcemaps.write(".", {includeContent: false, sourceRoot: "../src/"}))
    .pipe(gulp.dest("build/"));
});

gulp.task("test", ["compile"], function() {
  process.env.NODE_ENV = "test";
  dotenv.config();
  return gulp.src("./build/tests").pipe(jest({
    rootDir: process.cwd(),
    testEnvironment: "node",
    testMatch: ["**/build/**/?(*.)(spec|test).js?(x)"], //no idea - can i make simpler?
  }));
});


gulp.task("watch", () => {
  gulp.watch("src/**/*.*", ["test"]);
});

gulp.task("default", ["test"]);
