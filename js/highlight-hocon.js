/*
 * HOCON grammar for highlight.js 11 - highlight.js ships none.
 * Spec: https://github.com/lightbend/config/blob/main/HOCON.md
 */
hljs.registerLanguage('hocon', function (hljs) {
  var SUBSTITUTION = { scope: 'symbol', begin: /\$\{\??/, end: /\}/ };
  var MULTILINE_STRING = { scope: 'string', begin: /"""/, end: /"{3,}/ };
  var KEY = {
    scope: 'attr',
    match: /(?:"[^"\n]*"|[\w-]+)(?:\.(?:"[^"\n]*"|[\w-]+))*(?=\s*(?:[:={]|\+=))/
  };
  var INCLUDE = { scope: 'keyword', match: /\binclude\b/ };
  var INCLUDE_QUALIFIER = { scope: 'title.function', match: /\b(?:required|file|classpath|url)(?=\()/ };
  // durations (getDuration, getPeriod) and sizes (getBytes) are part of the spec
  var UNIT = 'ns|us|ms|nanos?|nanoseconds?|micros?|microseconds?|millis?|milliseconds?|seconds?|minutes?|hours?|days?' +
    '|weeks?|months?|years?|mo|[smhdwy]|bytes?|[KMGTPEZY]i?B?|[kKMGTPEZY]B|(?:kilo|kibi|mega|mebi|giga|gibi|tera|tebi)bytes?';
  var NUMBER = {
    scope: 'number',
    match: new RegExp('-?\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?(?:[ \\t]*(?:' + UNIT + '))?\\b')
  };
  return {
    name: 'HOCON',
    aliases: ['conf'],
    keywords: { literal: ['true', 'false', 'null'] },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      KEY,
      INCLUDE,
      INCLUDE_QUALIFIER,
      SUBSTITUTION,
      MULTILINE_STRING,
      hljs.QUOTE_STRING_MODE,
      NUMBER,
      { scope: 'operator', match: /\+=/ }
    ]
  };
});
