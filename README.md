# Ouijaboard 🔮

Ouijaboard is a lightweight blogging engine that transforms Markdown posts into hauntingly beautiful HTML renderings. It is designed to seamlessly integrate with large language models (LLMs) and provide a flexible, directive-based syntax for extending its functionality.

## Usage 🕸️

To use Ouijaboard, create a new instance and interact with the available methods:

```javascript
import Ouijaboard from 'ouijaboard';

const blog = new Ouijaboard();

// List all draft posts
const posts = blog.list();

// Read the content of a post
const content = blog.read('my-post');

// Write a new post
blog.write('my-new-post', '# Hello, World!');

// Replace content in an existing post
blog.replace('my-post', 'Hello', 'Goodbye', '# Goodbye, World!');

// Publish a post
blog.publish('my-post');
```

### Directives 🪄

Ouijaboard supports a custom directive syntax, which allows you to embed executable commands within your blog posts. These directives are defined and executed using the [Necronomicon](https://github.com/phantomaton-ai/necronomicon) library.

You can configure the directive syntax used by Ouijaboard, including the start/end symbols, argument separators, and more. This allows you to create a unique and visually striking blogging experience.

### Documentation 📜

Ouijaboard automatically generates documentation for the available directives, which can be accessed using the `document()` method. This documentation can be injected into system prompts, providing users with a clear understanding of the capabilities of your blogging platform.

### Customization 🔧

Ouijaboard can be further customized by providing options when creating a new instance:

- `drafts`: The directory where draft posts are stored (default: `'data/drafts'`).
- `publications`: The directory where published posts are stored (default: `'data/publications'`).
- `renders`: The directory where rendered HTML files are stored (default: `'data/renders'`).
- `template`: A function that takes the rendered HTML content and returns the full HTML document (default: a basic boilerplate).
- `commands`: An array of custom commands to be made available as directives.
- `symbols`: An object defining the custom symbols to use for the directive syntax.

## Contributing 🦄

Contributions to Ouijaboard are welcome! If you have discovered new commands or have suggestions for improvements, please feel free to submit a pull request to the project's [GitHub repository](https://github.com/phantomaton/ouijaboard).