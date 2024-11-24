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
      symbols: options.symbols
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
    // TODO should just list post IDs (no directory, no .md)
    return fs.readdirSync(this.drafts).filter(f => f.endsWith('.md'));
  }

  read(post) {
    return fs.readFileSync(path.join(this.drafts, `${post}.md`), 'utf-8');
  }

  write(post, content) {
    // TODO create or overwrite .md file contents, then render .html to renders
  }

  replace(post, from, to, content) {
    // TODO replace post content based on text matching from/to, inclusive (and render)
  }

  publish(post) {
    // TODO copy latest render to publications, fire some hook
  }
}

export default Ouijaboard;