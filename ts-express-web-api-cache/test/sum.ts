import tester from './../services/test/tester.js';
import { expect } from 'chai';
const test = new tester('sum');
test.main(async () => {
	//expect(X * X, 'X*X=Y').to.equal(Y);
});
test.comment = 'test if sum function can work';
export default test;