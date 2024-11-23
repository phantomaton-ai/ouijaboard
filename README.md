# Ouijaboard 🔮

Ouijaboard is a ghostly, AI-powered blog engine that transforms Markdown posts into hauntingly beautiful HTML renderings.

## Usage 🕸️

```javascript
import Ouijaboard from 'ouijaboard';

const b = new Ouijaboard();
b.write('example.md', '# Hello, World!');
```

Ouijaboard provides a set of methods for managing blog posts:

- `list()`: Returns a list of all Markdown files in the input directory.
- `read(file)`: Reads the content of a Markdown file.
- `write(file, content)`: Writes the rendered HTML of a Markdown file to the output directory.
- `rename(src, dst)`: Renames a Markdown file.
- `remove(file)`: Deletes a Markdown file.

You can also customize the input/output directories and the HTML template:

```javascript
const b = new Ouijaboard({
  input: 'my-posts',
  output: 'my-renders',
  template: (content) => `
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
  `
});
```

## Contributing 🦄

Contributions to Ouijaboard are welcome! Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/phantomaton/ouijaboard).