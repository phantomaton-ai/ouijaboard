import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import marked from 'marked';

const POST_DIR = 'data/posts';
const RENDER_DIR = 'data/renders';

export function initializeRendering() {
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