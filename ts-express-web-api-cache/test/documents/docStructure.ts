import tester from '.././../services/test/tester.js';
import docs from '../../services/documents/readFile.js';
import { expect } from 'chai';
const test = new tester('documents-docStructure');
test.main(async () => {
	const docsStructure = await docs('./documents');
	expect(JSON.stringify(docsStructure), 'get documents').to.equal(
		'{"introduce.md":"./documents/introduce.md","test":{"introduce.md":"./documents/test/introduce.md","test copy":{"aasd":{"sadasd.md":"./documents/test/test copy/aasd/sadasd.md"}}}}'
	);
});
test.comment = 'get documents dir structure';
export default test;
