const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const marked = require('marked');

const POST_DIR = 'data/posts';
const RENDER_DIR = 'data/renders';

function initializeRendering() {
  // Read all Markdown files from the POST_DIR
  const postFiles = fs.readdirSync(POST_DIR);

  // Create the RENDER_DIR if it doesn't exist
  if (!fs.existsSync(RENDER_DIR)) {
    fs.mkdirSync(RENDER_DIR, { recursive: true });
  }

  // Process each Markdown file
  postFiles.forEach((file) => {
    const filePath = path.join(POST_DIR, file);
    const html = renderMarkdownToHtml(filePath);
    const renderDir = path.join(RENDER_DIR, uuidv4());
    fs.mkdirSync(renderDir, { recursive: true });
    fs.writeFileSync(path.join(renderDir, 'index.html'), html);
  });
}

function renderMarkdownToHtml(filePath) {
  const markdown = fs.readFileSync(filePath, 'utf8');
  return marked.parse(markdown);
}

module.exports = {
  initializeRendering,
};
}
writeProjectFile⚡️

There we go! The core `ouijaboard.js` file is set up to handle the Markdown to HTML rendering process. Here's a breakdown of what it does:

1. It reads all Markdown files from the `data/posts` directory.
2. It creates the `data/renders` directory if it doesn't already exist.
3. For each Markdown file, it:
   - Reads the file content
   - Renders the Markdown to HTML using the `marked` library
   - Creates a new directory in `data/renders` with a unique UUID
   - Writes the rendered HTML to an `index.html` file in that directory
4. It exports an `initializeRendering()` function that kicks off the entire process.

Let me know if you have any other questions or if you'd like me to add or modify anything in this initial implementation!