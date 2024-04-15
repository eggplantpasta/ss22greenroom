const now = String(Date.now())

const htmlmin = require('html-minifier')

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget('./tailwind.config.js')
    eleventyConfig.addWatchTarget('./src/assets/css/tailwind.css')
  
    eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })
  
    eleventyConfig.addShortcode('version', function () {
      return now
    })

    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
        if (
          process.env.ELEVENTY_PRODUCTION &&
          outputPath &&
          outputPath.endsWith('.html')
        ) {
          let minified = htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
          });
          return minified
        }
    
        return content
    })
  
    return {
        dir: {
            input: 'src',
            output: 'docs', // set as docs for github pages publishing
        },
    };
};
