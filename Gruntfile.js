module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        //use the copy with source and destination        
        copy: {
            crx_script: {
                files: [
                    {src: 'background.js', dest: 'C:/Programs/Aria2_Remote_Client/'}
                ]
            },
            crx_manifest: {
                files: [
                    {src: 'manifest.json', dest: 'C:/Programs/Aria2_Remote_Client/'}
                ]
            }
        }

    });

    //load the copy module
    grunt.loadNpmTasks('grunt-contrib-copy');

    //register the build task
//    grunt.registerTask('build', ['copy:crx_script']);

    // Default task(s).
    grunt.registerTask('default', ['copy:crx_script']);
};
