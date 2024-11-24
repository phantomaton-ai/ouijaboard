import { expect, stub, restore } from 'lovecraft';
import fs from 'fs';
import path from 'path';
import ouijaboard from './ouijaboard.js';

describe('Ouijaboard', () => {
  let instance;

  beforeEach(() => {
    instance = ouijaboard({
      drafts: 'data/drafts',
      publications: 'data/publications',
      renders: 'data/renders'
    });

    // Stub out the relevant fs calls
    stub(fs, 'readdirSync').returns(['post1.md', 'post2.md']);
    stub(fs, 'readFileSync').returns('# Hello, World!');
    stub(fs, 'writeFileSync');
    stub(fs, 'copyFileSync');
  });

  afterEach(() => {
    restore();
  });

  it('should list posts', () => {
    const posts = instance.list();
    expect(posts).to.deep.equal(['post1', 'post2']);
    expect(fs.readdirSync.calledWith('data/drafts')).true;
  });

  it('should read a post', () => {
    const content = instance.read('post1');
    expect(content).to.equal('# Hello, World!');
    expect(fs.readFileSync.calledWith(
      path.join('data/drafts', 'post1.md'),
      'utf-8'
    )).true;
  });

  it('should write a post', () => {
    instance.write('post3', '# New Post');
    expect(fs.writeFileSync.calledWith(
      path.join('data/drafts', 'post3.md'),
      '# New Post'
    )).true;
    expect(fs.writeFileSync.calledWith(
      path.join('data/renders', 'post3.html'),
      `<!DOCTYPE html>
<html>
<head>
  <title>Ouijaboard</title>
</head>
<body>
  <h1>New Post</h1>
</body>
</html>
`
    )).true;
    
  });

  it('should replace post content', () => {
    instance.replace('post1', 'Hello', 'World!', 'Goodbye, folks!');
    expect(fs.writeFileSync.calledWith(
      path.join('data/drafts', 'post1.md'),
      '# Goodbye, folks!'
    )).true;
    expect(fs.writeFileSync.calledWith(
      path.join('data/renders', 'post1.html'),
      `<!DOCTYPE html>
<html>
<head>
  <title>Ouijaboard</title>
</head>
<body>
  <h1>Goodbye, folks!</h1>
</body>
</html>
`
    )).true;
  });

  it('should publish a post', () => {
    instance.publish('post1');
    expect(fs.copyFileSync.calledWith(
      path.join('data/renders', 'post1.html'),
      path.join('data/publications', 'post1.html')
    )).true;
  });
});