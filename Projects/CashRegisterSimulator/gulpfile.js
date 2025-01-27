/*
 * Script       :gulpfile.js
 * Author       :Richard Maida Jimenez
 * Date         :November 2024.
 * Version      :1.0.
 * Description  :Used for bundling project javascripts files together.
 * Source       :https://medium.com/self-modifying-code/exposing-classes-functions-and-other-fun-stuff-with-webpack-8592821d4ec8.
 *
 * IMPORTANT NOTES
 * ---------------
 * Ensure the following are installed in project root directory. Run following commands in Terminal: -
 * 
 * npm init
 * npm install
 * npm install gulp-cli -g
 * npm install gulp -D
 * npx -p touch nodetouch gulpfile.js
 * npm install webpack-stream -D
 * 
 * When gulpfile created run in Terminal: -
 * 
 *  gulp scripts-compile
 */
/*
 * Import the Gulp and WebPacks, giving them descriptive names for easy reference.
 */
const gulp        = require( 'gulp' );
const gulpWebpack = require( 'webpack-stream' );
/*
 * Declare variables related specifically to the JavaScript files in their own object so that in future, if SCSS or SFTP needs to
 * uploaded, new objects can be easily created that hold the variables for those modules.
 */
const JS_CONFIG = {
    FILE_NAME        : 'bundle.js',            // Refers to the name of the parent js file that will hold all our logic.
    LOCAL_DESTINATION: './public/assets/js',    // The location of where the js files are stored. This will be prefixed to the FILE_NAME later.
    SOURCES          : './src/',                // This is where we want our final compiled file to be places.
    JS_FILES_TO_WATCH: './src/**/*.js'          // This is what we will eventually to allow for automatic compilation when we make changes.
};
/*
 * Create webpackConfig object that will hold the configuration settings. Structured according to Webpack's own config setting so that it
 * will pass during initialisation.
 */
const webpackConfig = {
    entry : './src/bundle.js',                  // File used as the template for building the library.
    mode  : 'development',                      // Current mode we are building for.
    output: {
        filename: JS_CONFIG.FILE_NAME,          // File we will be outputting.
        library : 'MyCustomLibrary'             // Variable name for accessing the library.
    }
};
/*
 * Uses JS_CONFIG properties....see source page for notes in src() & dest().
 */
function compileScripts() {
    console.log('Compiling Scripts...');
    return gulp.src( JS_CONFIG.SOURCES + JS_CONFIG.FILE_NAME )      // Takes file.
               .pipe( gulpWebpack( webpackConfig ) )                // 
               .pipe( gulp.dest( JS_CONFIG.LOCAL_DESTINATION ) );   // Saves changes during pipe() chain methods.
}
/*
 * Create Gulp task, giving it a name to pass in function compileScripts.
 */
gulp.task( 'scripts-compile', compileScripts );