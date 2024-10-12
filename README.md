# Ouijaboard

Ouijaboard is a ghostly, AI-powered blog engine that transforms Markdown posts into hauntingly beautiful HTML renderings.

## How it Works

The core functionality of Ouijaboard is to:

1. Read Markdown files from the `data/posts` directory.
2. Render those Markdown files to HTML, storing the rendered content in the `data/renders` directory.
   - Each render is stored in a subdirectory identified by a unique UUID.
3. Expose a single function, `initializeRendering()`, that kicks off the rendering process.

No configuration options are needed at this time, but we'll likely want to add some in the future to customize the behavior.

## Getting Started

To use Ouijaboard, simply:

1. Place your Markdown blog posts in the `data/posts` directory.
2. Call the `initializeRendering()` function to render the posts to HTML.
3. The rendered HTML files will be available in the `data/renders` directory, organized by UUID.

And that's it! Ouijaboard takes care of the rest, providing you with a spooky, spectral blog engine.

## Contributing

Contributions to Ouijaboard are welcome! Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/your-username/ouijaboard).
