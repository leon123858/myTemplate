import colors from 'chalk';

interface tester {
	before: (func) => {};
	main: (func) => {};
	final: (func) => {};
	test: () => {};
	comment: string;
}

const before = async (testStructureStr: string, totalTestCount: Number) => {
	console.log(colors.bgCyan('[test before]'));
	const testStructure = JSON.parse(testStructureStr);
	console.log('testStructure:');
	console.log(testStructure);
	console.log(colors.white(`test file count: ${totalTestCount}`));
	return;
};
const main = async (array: any[]) => {
	let errList: Error[] = [];
	let errComments: string[] = [];
	console.log(colors.bgCyan('[test start]'));
	for (let i of array) {
		try {
			await i.test();
		} catch (err) {
			console.log(colors.bgRedBright(err.message));
			errList.push(err);
			errComments.push(i.comment);
		}
	}
	return { errList, errComments };
};
const final = async ({
	array,
	comments,
}: {
	array: Error[];
	comments: string[];
}) => {
	console.log(colors.bgCyan('[test end]'));
	if (array.length == 0) {
		console.log(colors.greenBright('Pass all tests !!!'));
		return;
	}
	console.log(colors.bgRedBright(`It have ${array.length} exception happen`));
	array.map((err, index) => {
		console.log(colors.white(`err ${index}:`));
		console.log(colors.italic(`${comments[index]}`));
		console.log(err);
		console.log('-----');
	});
	return;
};

export { before, main, final };
