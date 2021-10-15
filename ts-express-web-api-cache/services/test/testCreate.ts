import fs from 'fs/promises';

let line = 0;
let testers = [];
const testStructure = JSON.parse(
	(await fs.readFile('./test/test.json')).toString()
);

const createFile = (
	json: any,
	basePath: string,
	level: string,
	tags: string
) => {
	if (typeof json == 'string') return;
	Object.keys(json).forEach(async (key) => {
		let state;
		try {
			state = await fs.lstat(`${basePath}/${key}`);
		} catch (err) {
			const list = key.split('.');
			if (list.length < 2) {
				await fs.mkdir(`${basePath}/${key}`);
				createFile(
					json[key],
					`${basePath}/${key}`,
					`../${level}`,
					`${tags}${key}-`
				);
				return;
			}
			await fs.writeFile(
				`${basePath}/${key}`,
				`import tester from '${level}../services/test/tester.js';\r\nimport { expect } from 'chai';\r\nconst test = new tester('${
					tags + list[0]
				}');\r\ntest.main(async () => {\r\n	//expect(X * X, 'X*X=Y').to.equal(Y);\r\n});\r\ntest.comment = '${
					json[key]
				}';\r\nexport default test;`
			);
			return;
		}
		if (state.isDirectory()) {
			createFile(
				json[key],
				`${basePath}/${key}`,
				`../${level}`,
				`${tags}${key}-`
			);
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
			testers.push(`${list[0]}Test${line}`);
			line++;
		}
	});
};

const createIndex = async (json: any, basePath: string) => {
	let storage = {
		import: '',
	};
	getImport(json, storage, './');
	await fs.writeFile(
		`${basePath}/index.ts`,
		`import { before, main, final } from '../services/test/runner.js';\r\n${
			storage.import
		}\r\n(async () => {\r\n	await before('${JSON.stringify(
			testStructure
		)}',${line});\r\n	const errors = await main([${testers.join(
			','
		)}]);\r\n	await final({ array: errors.errList, comments: errors.errComments });\r\n})();`
	);
};

const main = async () => {
	const url = './test';
	console.log('testStructure:');
	console.log(testStructure);
	createFile(testStructure, url, './', '');
	createIndex(testStructure, url);
};

main();
