// const Image = require('@11ty/eleventy-img');
const path = require('path');
const pluginWebc = require('@11ty/eleventy-plugin-webc');

const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc, {
    components: 'src/_components/*.webc',
  });

  let mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.setLibrary('md', markdownIt(mdOptions));

  eleventyConfig.addCollection('events', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/_data/events/*.md');
  });
};

return {
  dir: {
    input: 'src',
    output: '_site',
    // includes: '_components',
  },
};
