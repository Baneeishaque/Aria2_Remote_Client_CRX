
var gulp = require('gulp');

gulp.task('copy_bower_components', function (done) {
    gulp.src('bower_components/**')
            .pipe(gulp.dest('C:/Programs/Aria2_Remote_Client/bower_components/'));
    done();
});

gulp.task('copy_crx_script', function (done) {
    gulp.src('background.js')
            .pipe(gulp.dest('C:/Programs/Aria2_Remote_Client/'));
    done();
});

gulp.task('copy_crx_manifest', function (done) {
    gulp.src('manifest.json')
            .pipe(gulp.dest('C:/Programs/Aria2_Remote_Client/'));
    done();
});

gulp.task('copy_crx', gulp.parallel('copy_bower_components', 'copy_crx_script', 'copy_crx_manifest', function (done) {
    done();
}));

gulp.task('default', function () {

    var watcher_bower = gulp.watch('bower_components/**', gulp.parallel('copy_bower_components', function (done) {
        done();
    }));
    watcher_bower.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    watcher_bower.on('unlink', function (path, stats) {
        console.log('File ' + path + ' was removed');
    });

    var watcher_manifest = gulp.watch('manifest.json', gulp.parallel('copy_crx_manifest', function (done) {
        done();
    }));
    watcher_manifest.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    watcher_manifest.on('unlink', function (path, stats) {
        console.log('File ' + path + ' was removed');
    });

    var watcher_script = gulp.watch('background.js', gulp.parallel('copy_crx_script', function (done) {
        done();
    }));
    watcher_script.on('change', function (path, stats) {
        console.log('File ' + path + ' was changed');
    });
    watcher_script.on('unlink', function (path, stats) {
        console.log('File ' + path + ' was removed');
    });

});
