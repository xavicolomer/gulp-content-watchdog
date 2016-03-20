/**
 * @license
 * global-jquery-selectors 0.1.0 <https://xavicolomer.com/>
 * Copyright 2016 Xavi Colomer <https://xavicolomer.com/>
 * Copyright 2016 Xavi Colomer
 *
 * Available under MIT license 
 *
 *
 * GLOBAL JQUERY CLASSES
 * 
 * This plugin looks for global jquery selectors.
 * 
 * Correct: $domElement.find(SELECTORS.className);
 * Incorrect: $(SELECTORS.className);
*/

var gutil = require('gulp-util');

function test(text, path, lineNumber) {
    var matches = 0;
    var re = /\$\((?!this|window|document|.+currentTarget|.+target|\'body\')[\'\`]?(\.?[a-z \.#\{\}0-9\$]+)/gi; 
    var _path = path;
    
    while ((m = re.exec(text)) !== null) {
        if (lineNumber) {
            _path += ':' + (lineNumber + 1);
        }
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }

        gutil.log('[Global JQuery Selector]', gutil.colors.magenta(_path), m[1]);
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