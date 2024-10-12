import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import marked from 'marked';

const DEFAULT_POST_DIR = 'data/posts';
const DEFAULT_RENDER_DIR = 'data/renders';

const DEFAULT_TEMPLATE = (content) => `
<!DOCTYPE html>
<html>
<head>
  <title>Ouijaboard</title>
</head>
<body>
  ${content}
</body>
</html>
`;

export default function render(options = {}) {
  const {
    postDir = DEFAULT_POST_DIR,
    renderDir = DEFAULT_RENDER_DIR,
    template = DEFAULT_TEMPLATE,
  } = options;

  // Read all Markdown files from the postDir
  const postFiles = fs.readdirSync(postDir).filter((file) => file.endsWith('.md'));

  // Create the renderDir if it doesn't exist
  if (!fs.existsSync(renderDir)) {
    fs.mkdirSync(renderDir, { recursive: true });
  }

  // Create a new render directory
  const newRenderDir = path.join(renderDir, uuidv4());
  fs.mkdirSync(newRenderDir, { recursive: true });

  // Process each Markdown file
  postFiles.forEach((file) => {
    const filePath = path.join(postDir, file);
    const html = renderMarkdownToHtml(filePath);
    const outputPath = path.join(newRenderDir, path.basename(file, '.md') + '.html');
    fs.writeFileSync(outputPath, template(html));
  });

  return newRenderDir;
}

function renderMarkdownToHtml(filePath) {
  const markdown = fs.readFileSync(filePath, 'utf8');
  return marked.parse(markdown);
}