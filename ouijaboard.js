import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import marked from 'marked';

const POST_DIR = 'data/posts';
const RENDER_DIR = 'data/renders';

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
  const { template = DEFAULT_TEMPLATE } = options;

  // Read all Markdown files from the POST_DIR
  const postFiles = fs.readdirSync(POST_DIR).filter((file) => file.endsWith('.md'));

  // Create the RENDER_DIR if it doesn't exist
  if (!fs.existsSync(RENDER_DIR)) {
    fs.mkdirSync(RENDER_DIR, { recursive: true });
  }

  // Create a new render directory
  const renderDir = path.join(RENDER_DIR, uuidv4());
  fs.mkdirSync(renderDir, { recursive: true });

  // Process each Markdown file
  postFiles.forEach((file) => {
    const filePath = path.join(POST_DIR, file);
    const html = renderMarkdownToHtml(filePath);
    const outputPath = path.join(renderDir, path.basename(file, '.md') + '.html');
    fs.writeFileSync(outputPath, template(html));
  });

  return renderDir;
}

function renderMarkdownToHtml(filePath) {
  const markdown = fs.readFileSync(filePath, 'utf8');
  return marked.parse(markdown);
}