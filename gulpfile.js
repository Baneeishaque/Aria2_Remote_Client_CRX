/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('copy_crx_script', function () {
    gulp.src('background.js')
        .pipe(gulp.dest('C:/Programs/Aria2_Remote_Client/'));
});

gulp.task('copy_crx_manifest', function () {
    gulp.src('manifest.json')
        .pipe(gulp.dest('C:/Programs/Aria2_Remote_Client/'));
});