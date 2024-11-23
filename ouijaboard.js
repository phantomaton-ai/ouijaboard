import fs from 'fs';
import path from 'path';
import marked from 'marked';

class Ouijaboard {
  static DEFAULT_INPUT_DIR = 'data/posts';
  static DEFAULT_OUTPUT_DIR = 'data/renders';

  static DEFAULT_TEMPLATE = (content) => `
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

  constructor(options = {}) {
    this.i = options.input || Ouijaboard.DEFAULT_INPUT_DIR;
    this.o = options.output || Ouijaboard.DEFAULT_OUTPUT_DIR;
    this.t = options.template || Ouijaboard.DEFAULT_TEMPLATE;
  }

  list() {
    return fs.readdirSync(this.i).filter(f => f.endsWith('.md'));
  }

  read(f) {
    return fs.readFileSync(path.join(this.i, f), 'utf8');
  }

  write(f, c) {
    const p = path.join(this.o, path.basename(f, '.md') + '.html');
    fs.writeFileSync(p, this.t(this.renderMarkdown(c)));
    return p;
  }

  rename(src, dst) {
    const srcPath = path.join(this.i, src);
    const dstPath = path.join(this.i, dst);
    fs.renameSync(srcPath, dstPath);
    return dstPath;
  }

  remove(f) {
    const p = path.join(this.i, f);
    fs.unlinkSync(p);
  }

  renderMarkdown(markdown) {
    return marked.parse(markdown);
  }
}

export default Ouijaboard;