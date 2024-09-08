module.exports = function (eleventyConfig) {
  eleventyConfig.addJavaScriptFunction('getEventList', function (collection) {
    return collection || [];
  });

  eleventyConfig.addJavaScriptFunction('getEventStyles', function (events) {
    return events
      .map(
        (event) => `
        .event-item.${event.data.category} {
          background-color: ${event.data.color};
          color: white;
        }
      `
      )
      .join('\n');
  });
};
