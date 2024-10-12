import fs from 'fs';
import path from 'path';
import marked from 'marked';

const DEFAULT_INPUT_DIR = 'data/posts';
const DEFAULT_OUTPUT_DIR = 'data/renders';

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
    input = DEFAULT_INPUT_DIR,
    output = DEFAULT_OUTPUT_DIR,
    template = DEFAULT_TEMPLATE,
  } = options;

  // Read all Markdown files from the input directory
  const postFiles = fs.readdirSync(input).filter((file) => file.endsWith('.md'));

  // Create the output directory if it doesn't exist
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }

  // Process each Markdown file
  postFiles.forEach((file) => {
    const filePath = path.join(input, file);
    const html = renderMarkdownToHtml(filePath);
    const outputPath = path.join(output, path.basename(file, '.md') + '.html');
    fs.writeFileSync(outputPath, template(html));
  });

  return output;
}

function renderMarkdownToHtml(filePath) {
  const markdown = fs.readFileSync(filePath, 'utf8');
  return marked.parse(markdown);
}