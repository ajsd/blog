var path = require('path');
var util = require('util');

var startLine = /^\s*<!--\s*replace:\s*([^\s]+)\s*-->$/;
var endLine = /^\s*<!--\s*endreplace\s*-->\s*$/;
var srcRegex = /((?:src|href)=['"])([^'"]+)(['"])/;

var replace = function(data) {
  var output = [];
  var lines = data.toString().replace(/\r\n/g, '\n').split(/\n/);
  var len = lines.length;
  for (var i = 0; i < len; ++i) {
    var line = lines[i];
    var match = line.match(startLine);
    if (match) {
      line = lines[i + 1].replace(srcRegex, '$1' + match[1] + '$3');
      for (; i < len && !endLine.test(lines[i]); ++i);
    }
    output.push(line);
  }
  return output.join('\n');
};

module.exports = function(grunt) {
  grunt.registerMultiTask('usereplace', 'Replace src/href in HTML', function() {
    this.files.forEach(function(f) {
      var files = grunt.file.expand({nonull: true}, f.src);

      grunt.log.writeln('Processing ' + files.join(', '));

      files.map(grunt.file.read).forEach(function (content, i) {
        grunt.log.writeln(files[i] + ' -> ' + f.dest);
        grunt.file.write(f.dest, replace(content));
      });
    });
  });
};
