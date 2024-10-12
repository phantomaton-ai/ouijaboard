# Ouijaboard

Ouijaboard is a ghostly, AI-powered blog engine that transforms Markdown posts into hauntingly beautiful HTML renderings.

## Usage

```
import ouijaboard from 'ouijaboard';
ouijaboard();
```

Ouijaboard exposes a single function which reads `.md` files and writes `.html` files.

By default, `.md` files are read from `data/posts` and written to `data/renders` but this may be customized with options.

## Options

### `input`
The directory where Markdown files are located. Defaults to `'data/posts'`.

### `output`
The directory where rendered HTML files will be written. Defaults to `'data/renders'`.

### `template`
A function that takes the rendered HTML content as input and returns the fully wrapped HTML document. This allows you to customize the HTML structure, add stylesheets, and more to create a unique look and feel for your blog.

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

You can provide a custom `template` function like this:

```javascript
import ouijaboard from 'ouijaboard';
ouijaboard({
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

## Contributing

Contributions to Ouijaboard are welcome! Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/phantomaton/ouijaboard).