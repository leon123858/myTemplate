import sumTest from './add.js';

const before = async () => {
	console.log('test before');
	return;
};
const main = async () => {
	console.log('test start');
	await sumTest();
	return;
};
const final = async () => {
	console.log('test end');
	return;
};

before()
	.then(() => main())
	.then(() => final());
