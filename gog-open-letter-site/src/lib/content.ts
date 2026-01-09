import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getLetterContent(locale: string) {
  const fullPath = path.join(contentDirectory, 'letters', `${locale}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const matterResult = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    ...matterResult.data,
  };
}

export function getProposals() {
  const fullPath = path.join(contentDirectory, 'proposals.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  return JSON.parse(fileContents);
}

export function getLastUpdated() {
  const proposalsPath = path.join(contentDirectory, 'proposals.json');
  const letterItPath = path.join(contentDirectory, 'letters', 'it.md');
  const letterEnPath = path.join(contentDirectory, 'letters', 'en.md');
  
  const proposalsStats = fs.statSync(proposalsPath);
  const letterItStats = fs.statSync(letterItPath);
  const letterEnStats = fs.statSync(letterEnPath);
  
  const dates = [
    proposalsStats.mtime,
    letterItStats.mtime,
    letterEnStats.mtime
  ];
  
  return new Date(Math.max(...dates.map(d => d.getTime())));
}