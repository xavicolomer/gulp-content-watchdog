# Gulp content watchdog #0.1.0

This is a gulp plugin that allows testing the content of different files to ensure guidelines.

### Installation
```
npm install https://github.com/xavicolomer/gulp-content-watchdog.git --save-dev
```

### How to use

This example will apply the listed plugins to all the js files on a given directory, and will display the affected line too. (This is useful because 'CMD + Click' on the console will open the default editor on the selected line)

Gulpfile.js
```
gulp.task('content-watchdog', function() {
    gulp.src(paths.source + 'js/**/*').pipe(contentWatchdog({
        showLineNumbers: true,
        plugins: [
            'hardcoded-classes',
            'global-jquery-selector'
        ]
    }))
});
```

On the console:
```
$ gulp content-watchdog
```

### Options

* showLineNumbers (true | false) Regular Expressions will be applied to the line or to the file
* plugins (String Array) A collection of plugins to apply to the content

### Plugins

**hardcoded-classes**

Searches for Hardcoded Jquery classes. Since I prefer to have them all in variables.

Incorrect:
```
$myVariable.find('.className');
````

Correct:
```
var className = '.className';
$myVariable.find(className);
````

**global-jquery-selector**

Searches for Global Jquery Queries. Global queries are really dangerous because multiple instances can be affected.

Incorrect:
```
$('.className');
````

Correct:
```
$myVariable.find('.className');
````

### Version
0.1.0

### Contact Info
* [twitter](https://twitter.com/xaviercolomer)
* [linkedin](https://es.linkedin.com/in/xaviercolomer)
* [website](http://xavicolomer.com)
