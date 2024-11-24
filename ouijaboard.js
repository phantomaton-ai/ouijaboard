import fs from 'fs';
import path from 'path';
import marked from 'marked';
import necronomicon from 'necronomicon';

const DEFAULTS = {
  commands: [],
  drafts: 'data/drafts',
  publications: 'data/publications',
  renders: 'data/renders',
  symbols: { directive: { start: '🔮', end: '👻' } },
  template: (content) => `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Ouijaboard</title>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `
};

class Ouijaboard {
  constructor(options = {}) {
    options = { ...DEFAULTS, ...options };
    this.drafts = options.drafts;
    this.publications = options.publications;
    this.renders = options.renders;
    this.template = options.template;
    this.spellbook = necronomicon({
      commands: options.commands,
      symbols: options.symbols,
      includes: { text: true, results: true, directives: false }
    });
  }

  document() {
    const documentation = this.spellbook.document();
    const shifted = documentation.split('\n').map(
      line => line.startsWith('#') ? `#${line}` : line
    ).join('\n');
    return [
      '# Blog post syntax',
      '',
      'Blog posts are written in Markdown, with support for custom directives.',
      '',
      shifted
    ].join('\n')
  }

  list() {
    // List post IDs (no directory, no .md)
    return fs.readdirSync(this.drafts)
      .filter(f => f.endsWith('.md'))
      .map(f => path.parse(f).name);
  }

  read(post) {
    return fs.readFileSync(path.join(this.drafts, `${post}.md`), 'utf-8');
  }

  write(post, content) {
    // Create or overwrite .md file contents, then render .html to renders
    const draftPath = path.join(this.drafts, `${post}.md`);
    fs.writeFileSync(draftPath, content);
    const renderedPath = this.render(post, content);
    return renderedPath;
  }

  replace(post, from, to, content) {
    // Replace post content based on text matching from/to, inclusive (and render)
    const currentContent = this.read(post);
    const newContent = currentContent.replace(new RegExp(from, 'g'), to, content);
    return this.write(post, newContent);
  }

  publish(post) {
    // Copy latest render to publications, fire some hook
    const renderPath = path.join(this.renders, `${post}.html`);
    const publicationPath = path.join(this.publications, `${post}.html`);
    fs.copyFileSync(renderPath, publicationPath);
    this.firePublishHook(post);
  }

  render(post, content) {
    // Render .html to renders directory
    const renderedContent = this.spellbook.execute(content);
    const renderedPath = path.join(this.renders, `${post}.html`);
    fs.writeFileSync(renderedPath, this.template(renderedContent));
    return renderedPath;
  }

  firePublishHook(post) {
    // TODO: Implement any necessary publish hooks
    console.log(`Published post: ${post}`);
  }
}

export default Ouijaboard;