// const Image = require('@11ty/eleventy-img');
const path = require('path');
const pluginWebc = require('@11ty/eleventy-plugin-webc');

const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  // eleventyConfig.addPlugin(pluginWebc, {
  //   components: 'src/_components/*.webc',
  // });

  eleventyConfig.addPlugin(pluginWebc, {
    components: 'src/**/*.webc',
    transformers: {
      njk: async (content) => {
        // Use 11ty's Nunjucks engine to render the content
        let nunjucks = require('nunjucks');
        let env = new nunjucks.Environment(
          new nunjucks.FileSystemLoader('_components')
        );
        return env.renderString(content);
      },
    },
  });

  let mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.setLibrary('md', markdownIt(mdOptions));

  eleventyConfig.setTemplateFormats(['njk', 'webc', 'md', 'html']);

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
  // passthroughFileCopy: true,
  templateFormats: ['md', 'njk', 'html', 'webc'],
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine: 'njk',
  dataTemplateEngine: 'njk',
};
