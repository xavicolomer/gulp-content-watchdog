/**
 * @license
 * gulp-content-watchdog 0.1.0 <https://xavicolomer.com/>
 * Copyright 2016 Xavi Colomer <https://xavicolomer.com/>
 * Copyright 2016 Xavi Colomer
 * 
 * Available under MIT license 
 */

var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var jsWatchdogPlugin = function(opts)  {
   opts = opts || {};

   var fileName;
   var matches = 0;

   function bufferContents(file, enc, cb) {
      // ignore empty files
      if (file.isNull()) {
         cb();
         return;
      }

      if (opts.plugins) {
         for (var key in opts.plugins) {
            try { 
               var plugin = require('./plugins/' + opts.plugins[key] + '.js');
               matches += plugin(file, opts);
            } catch(err) {
               gutil.log(gutil.colors.red(opts.plugins[key] + ' plugin not found.'), err);
            }
         }
      }

      cb();
   };
    
   function endStream(cb) {
      gutil.log('\n', gutil.colors.red(matches), 'Guidelines violations found.');
      
      cb();
   }

   return through.obj(bufferContents, endStream);
};

module.exports = jsWatchdogPlugin;