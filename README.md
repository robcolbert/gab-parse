# gab-parse

Copyright (C) 2019 Gab AI, Inc.<br/>
License: MIT

The `gab-parse` module implements a function that accepts text input and renders all @mentions and #hashtags to HTML links. By default, the links go to [Gab.com](https://gab.com/).

## Getting Started

To install gab-parse using NPM:

    npm install gab-parse

To install gab-parse using yarn:

    yarn add gab-parse

## Default Use

    var gabParse = require('gab-parse');

    var parser = gabParse();
    var text = 'This gab mentions @robcolbert and the #LearnToCode hashtag.';
    console.log(parser(text));

## Advanced Use

    var gabParse = require('gab-parse');

    var standard = gabParse();

    console.log(standard('I am mentioning @support.'));
    console.log(standard('This is a #hashtag'));

    var hashtagsOnly = gabParse({ mentions: false });
    var mentionsOnly = gabParse({ hashtags: false });
    var twitter      = gabParse({
      replaceMention: (mention) => {
        return `<a href="https://twitter.com/${mention.slice(1)}">${mention}</a>`;
      },
      replaceHashtag: (tag) => {
        return `<a href="https://twitter.com/hashtag/${tag.slice(1)}">${tag}</a>`;
      }
    });

    var text = 'This gab mentions @robcolbert and the #LearnToCode hashtag.';
    console.log(standard(text));
    console.log(hashtagsOnly(text));
    console.log(mentionsOnly(text));
    console.log(twitter(text));

## Options

    {
      mentions: Boolean,
      hashtags: Boolean,
      replaceMention: Function,
      replaceHashtag: Function
    }

The gab-parse module exposes a function that accepts an options object and returns a configured function that parses text with the options provided. The parser can enable/disable the processing of mentions and/or hashtags, and the replacer functions can be overridden to provide whatever level of formatting is required including linking to other services.

### mentions: Boolean

When true, mentions will be replaced. When false, mentions will not be replaced.

### hashtags: Boolean

When true, hashtags will be replaced. When false, hashtags will not be replaced.

### replaceMention: Function

A function that accepts a mention with the at symbol (@) and returns a well-formed HTML &lt;a&gt; element with the `href` attribute set to link to a service's profile page for the mentioned user.

### replaceHashtag: Function

A function that accepts a mention with the hash/pound sign (#) and returns a well-formed HTML &lt;a&gt; element with the `href` attribute set to link to a service's page about the tag.
