import tester from '.././../services/test/tester.js';
import render from '../../services/documents/translate.js';
import { expect } from 'chai';
const test = new tester('documents-markdown2Html');
test.main(async () => {
	const output = await render('./documents/introduce.md');
	//console.log(output);
	expect(output, 'testTranslate file in doc').to.be.a('string');
});
test.comment = 'from markdown path to html';
export default test;
