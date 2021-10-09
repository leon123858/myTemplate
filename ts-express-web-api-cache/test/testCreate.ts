import fs from 'fs/promises';

let line = 0;

const testStructure = JSON.parse(
	(await fs.readFile('./test/test.json')).toString()
);

const createFile = (json: any, basePath: string) => {
	if (typeof json == 'string') return;
	Object.keys(json).forEach(async (key) => {
		let state;
		try {
			state = await fs.lstat(`${basePath}/${key}`);
		} catch (err) {
			const list = key.split('.');
			if (list.length < 2) {
				await fs.mkdir(`${basePath}/${key}`);
				createFile(json[key], basePath + '/' + key);
				return;
			}
			await fs.writeFile(
				`${basePath}/${key}`,
				`
			import { expect } from 'chai';

const before = async () => {
	console.log('${list[0]} test before');
	return;
};
const main = async () => {
	console.log('${list[0]} test start');
	//expect(XX).to.equal(XX);
	await final();
	return;
};
const final = async () => {
	console.log('${list[0]} test end');
	return;
};
////////////////////////////////
// 只測試這塊時解除屏蔽
////////////////////////////////
// before()
// 	.then(() => main())
// 	.then(() => final());
export default main;

			`
			);
			return;
		}
		if (state.isDirectory()) {
			createFile(json[key], basePath + '/' + key);
		}
		return;
	});
};

const getImport = (json, storage, basePath) => {
	if (typeof json == 'string') return;
	Object.keys(json).forEach(async (key) => {
		const list = key.split('.');
		if (list.length < 2) {
			getImport(json[key], storage, basePath + key + '/');
		} else {
			storage.import += `import ${list[0]}Test${line} from "${basePath}${list[0]}.js";\r\n`;
			storage.test += `await ${list[0]}Test${line}();\r\n`;
			line++;
		}
	});
};

const createIndex = async (json: any, basePath: string) => {
	let storage = {
		import: '',
		test: '',
	};
	getImport(json, storage, './');
	await fs.writeFile(
		`${basePath}/index.ts`,
		`
		${storage.import}

		const before = async () => {
			console.log('[test before]');
			return;
		};
		const main = async () => {
			console.log('[test start]');
			
			${storage.test}

			return;
		};
		const final = async () => {
			console.log('[test end]');
			return;
		};
		
		before()
			.then(() => main())
			.then(() => final());
		`
	);
};

const main = async () => {
	const url = './test';
	console.log('testStructure:');
	console.log(testStructure);
	createFile(testStructure, url);
	createIndex(testStructure, url);
};

main();
