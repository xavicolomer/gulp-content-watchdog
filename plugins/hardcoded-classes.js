/**
 * @license
 * hardcoded-classes 0.1.0 <https://xavicolomer.com/>
 * Copyright 2016 Xavi Colomer <https://xavicolomer.com/>
 * Copyright 2016 Xavi Colomer
 * 
 * Available under MIT license 
 *
 *
 * HARDCODED CLASSES
 * 
 * This plugin looks for hardcoded jquery string selectors
 * All selectors should be placed in a variable
 * 
 * Correct: $domElement.find(SELECTORS.className);
 * Incorrect: $domElement.find('.className');
*/

var gutil = require('gulp-util');

/** Look for Regular Expression matches */
function test(text, path, lineNumber) {
    var matches = 0;
    var re = /(?![require])\$[a-z\.\[\]0-9]*\(\'([a-z\-\_\.\+ \'\#0-9]+)\'?\)/gi; 
    
    while ((m = re.exec(text)) !== null) {
        if (lineNumber) {
            path += ':' + lineNumber;
        }
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }

        gutil.log('[Hardcoded Class]', gutil.colors.magenta(path), m[1]);
        matches++;
    }

    return matches;
}

module.exports = function(file, opts) {
    var m;
    var matches = 0;
    var contents = file.contents.toString('utf8');

    if (opts.showLineNumbers) {
        var lines = contents.split('\n');
        for (var i = 0, len = lines.length; i < len; ++i) {
            matches += test(lines[i], file.path, i);
        }
    } else {
        matches += test(contents, file.path);
    }

    return matches;
}