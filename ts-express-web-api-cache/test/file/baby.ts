
			import { expect } from 'chai';

const before = async () => {
	console.log('baby test before');
	return;
};
const main = async () => {
	console.log('baby test start');
	//expect(XX).to.equal(XX);
	await final();
	return;
};
const final = async () => {
	console.log('baby test end');
	return;
};
////////////////////////////////
// 只測試這塊時解除屏蔽
////////////////////////////////
// before()
// 	.then(() => main())
// 	.then(() => final());
export default main;

			