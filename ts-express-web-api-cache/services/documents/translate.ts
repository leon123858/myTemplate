import MarkdownIt from 'markdown-it';
import { readFile } from 'fs/promises';
const md = new MarkdownIt();

const getMarkdownHtml = async (path: string) => {
	const docs = (await readFile(path)).toString();
	return md.render(docs);
};

export default getMarkdownHtml;
