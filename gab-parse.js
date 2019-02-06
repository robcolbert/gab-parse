// gab-parse.js
// Copyright (C) 2019 Gab AI, Inc.
// License: MIT

'use strict';

module.exports = (options) => {

  const defaults = {
    mentions: true,
    hashtags: true,
    replaceMention: (mention) => {
      return `<a href="https://gab.com/${mention.slice(1)}">${mention}</a>`;
    },
    replaceHashtag: (tag) => {
      return `<a href="https://gab.com/hash/${tag.slice(1)}">${tag}</a>`;
    }
  };

  if (!options) {
    options = defaults;
  } else if (Array.isArray(options)) {
    throw new Error('gab-parse: options must not be an array');
  } else if (typeof options !== 'object') {
    throw new Error('gab-parse: options must be an object');
  } else {
    options = Object.assign(defaults, options);
  }

  return (text) => {
    var parseRegEx = /(^|\s)(#|@)\w{3,30}\b/g;
    var slugs = { };
  
    var tags = text.match(parseRegEx);
    if (!tags || !tags.length) {
      return text;
    }

    tags = tags
    .map((tag) => {
      return tag.trim();
    })
    .filter((tag) => {
      return !slugs[tag] && (slugs[tag] = true);
    });
  
    tags.forEach((tag) => {
      switch (tag[0]) {
        case '@':
          if (options.mentions) {
            text = text.replace(new RegExp(tag, 'g'), options.replaceMention(tag));
          }
          break;
        case '#':
          if (options.hashtags) {
            text = text.replace(new RegExp(tag, 'g'), options.replaceHashtag(tag));
          }
          break;
      }
    });
  
    return text;
  };
};