import MarkdownIt from 'markdown-it';
import { readFile } from 'fs/promises';
const md = new MarkdownIt();

const getMarkdownHtml = async (path: string) => {
	const ext = path[path.length - 2] + path[path.length - 1];
	//if (ext != 'md') return '<h1>Error</h1>';
	path = path.replace('../', '');
	path = path.replace('./documents', '');
	path = path.replace('./', '');
	path = './documents' + path;
	const docs = (await readFile(path)).toString();
	return md.render(docs);
};

export default getMarkdownHtml;
