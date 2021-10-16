import tester from '.././../services/test/tester.js';
import {
	getDocumentsStructure,
	getList,
} from '../../services/documents/readFile.js';
import { expect } from 'chai';

const test = new tester('documents-docStructure');
test.main(async () => {
	const docsStructure = await getDocumentsStructure('./documents');
	expect(JSON.stringify(docsStructure.final), 'get documents').to.equal(
		'{"introduce.md":"./documents/introduce.md","test":{"introduce.md":"./documents/test/introduce.md","test copy":{"aasd":{"sadasd.md":"./documents/test/test copy/aasd/sadasd.md"}}}}'
	);
	expect(JSON.stringify(Object.values(docsStructure.json))).to.equal(
		JSON.stringify(await getList(docsStructure))
	);
});
test.comment = 'get documents dir structure';
export default test;
