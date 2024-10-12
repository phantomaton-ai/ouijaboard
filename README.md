# Ouijaboard

Ouijaboard is a ghostly, AI-powered blog engine that transforms Markdown posts into hauntingly beautiful HTML renderings.

## How it Works

The core functionality of Ouijaboard is to:

1. Read Markdown files from the `data/posts` directory (only files ending in `.md`).
2. Render those Markdown files to HTML, storing the rendered content in the `data/renders` directory.
   - Each render is stored in a subdirectory identified by a unique UUID.
   - The rendered HTML files are named after the original Markdown file names (e.g., `my-post.md` -> `my-post.html`).
3. Provide a `template` option that allows you to customize the HTML wrapper around the blog post content.
4. Expose a single function, `initializeRendering()`, that kicks off the rendering process.

## Customizing the HTML Template

By default, Ouijaboard will wrap the rendered blog post HTML in a basic boilerplate template:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Ouijaboard</title>
</head>
<body>
  {{{ content }}}
</body>
</html>
```

You can provide a custom `template` function to Ouijaboard that takes the rendered HTML content as input and returns the fully wrapped HTML document:

```javascript
initializeRendering({
  template: (content) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>My Ouijaboard Blog</title>
        <link rel="stylesheet" href="my-styles.css">
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
  }
});
```

This allows you to customize the HTML structure, add stylesheets, and more to create a unique look and feel for your blog.

## Getting Started

To use Ouijaboard, simply:

1. Place your Markdown blog posts in the `data/posts` directory (with a `.md` extension).
2. Call the `initializeRendering()` function (optionally passing in a `template` option) to render the posts to HTML.
3. The rendered HTML files will be available in the `data/renders` directory, organized by UUID, with the original file names (e.g., `my-post.html`).

And that's it! Ouijaboard takes care of the rest, providing you with a spooky, spectral blog engine.

## Contributing

Contributions to Ouijaboard are welcome! Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/your-username/ouijaboard).