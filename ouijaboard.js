import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import necronomicon from 'necronomicon';

const DEFAULTS = {
  commands: [],
  drafts: 'data/drafts',
  publications: 'data/publications',
  renders: 'data/renders',
  symbols: { directive: { start: '🔮', end: '👻' } },
  template: (content) => `<!DOCTYPE html>
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
    ].join('\n');
  }

  list() {
    return fs.readdirSync(this.drafts)
      .filter(f => f.endsWith('.md'))
      .map(f => path.parse(f).name);
  }

  read(post) {
    return fs.readFileSync(path.join(this.drafts, `${post}.md`), 'utf-8');
  }

  write(post, content) {
    const draft = path.join(this.drafts, `${post}.md`);
    fs.writeFileSync(draft, content);
    const executed = this.spellbook.execute(content);
    const rendered = marked.parse(executed).trim();
    const render = path.join(this.renders, `${post}.html`);
    fs.writeFileSync(render, this.template(rendered));
  }

  replace(post, from, to, content) {
    const current = this.read(post);
    const start = current.indexOf(from);
    const end = current.slice(start + from.length).indexOf(to);
    const count = end + from.length + to.length;
    const replaced = [
      current.slice(0, start),
      content,
      current.slice(start + count)
    ].join('');
    return this.write(post, replaced);
  }

  publish(post) {
    const render = path.join(this.renders, `${post}.html`);
    const publication = path.join(this.publications, `${post}.html`);
    fs.copyFileSync(render, publication);
  }
}

const ouijaboard = options => new Ouijaboard(options);

export default ouijaboard;
