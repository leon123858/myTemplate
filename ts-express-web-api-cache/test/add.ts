import sum from '../services/utils/add.js';
import { expect } from 'chai';

const before = async () => {
	console.log('test before');
	return;
};
const main = async () => {
	console.log('add test start');
	let num = await sum(1, 2);
	expect(num).to.equal(3);
	num = await sum(5, 7);
	expect(num).to.equal(12);
	num = await sum(8, 2);
	expect(num).to.equal(10);
	num = await sum(111, 234);
	expect(num).to.equal(345);
	num = await sum(0, 55);
	expect(num).to.equal(55);
	return;
};
const final = async () => {
	console.log('test end');
	return;
};
////////////////////////////////
// 只測試這塊時解除屏蔽
////////////////////////////////
// before()
// 	.then(() => main())
// 	.then(() => final());

export default main;
