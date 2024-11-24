import { expect } from 'lovecraft';
import fs from 'fs';
import path from 'path';
import Ouijaboard from './ouijaboard';

describe('Ouijaboard', () => {
  let ouijaboard;

  beforeEach(() => {
    ouijaboard = new Ouijaboard({
      drafts: 'data/drafts',
      publications: 'data/publications',
      renders: 'data/renders'
    });

    // Stub out the relevant fs calls
    this.sandbox.stub(fs, 'readdirSync').returns(['post1.md', 'post2.md']);
    this.sandbox.stub(fs, 'readFileSync').returns('# Hello, World!');
    this.sandbox.stub(fs, 'writeFileSync');
    this.sandbox.stub(fs, 'copyFileSync');
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  it('should list posts', () => {
    const posts = ouijaboard.list();
    expect(posts).to.deep.equal(['post1', 'post2']);
    expect(fs.readdirSync).to.have.been.calledWith('data/drafts');
  });

  it('should read a post', () => {
    const content = ouijaboard.read('post1');
    expect(content).to.equal('# Hello, World!');
    expect(fs.readFileSync).to.have.been.calledWith(
      path.join('data/drafts', 'post1.md'),
      'utf-8'
    );
  });

  it('should write a post', () => {
    ouijaboard.write('post3', '# New Post');
    expect(fs.writeFileSync).to.have.been.calledWith(
      path.join('data/drafts', 'post3.md'),
      '# New Post'
    );
    expect(fs.writeFileSync).to.have.been.calledWith(
      path.join('data/renders', 'post3.html'),
      this.sandbox.match.any
    );
  });

  it('should replace post content', () => {
    ouijaboard.replace('post1', 'Hello', 'Goodbye', '# Goodbye, World!');
    expect(fs.writeFileSync).to.have.been.calledWith(
      path.join('data/drafts', 'post1.md'),
      '# Goodbye, World!'
    );
    expect(fs.writeFileSync).to.have.been.calledWith(
      path.join('data/renders', 'post1.html'),
      this.sandbox.match.any
    );
  });

  it('should publish a post', () => {
    ouijaboard.publish('post1');
    expect(fs.copyFileSync).to.have.been.calledWith(
      path.join('data/renders', 'post1.html'),
      path.join('data/publications', 'post1.html')
    );
  });
});