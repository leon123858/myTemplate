import { readdir, lstat } from 'fs/promises';

interface docsStructure {
	[fileOrDir: string]: string | docsStructure;
}

const get = async (
	path: string,
	obj: { json: docsStructure; final: docsStructure },
	where: string
) => {
	const list = await readdir(path);
	for (let Element of list) {
		const state = await lstat(`${path}/${Element}`);
		if (state.isFile()) {
			obj.json[`${where}~${Element}`] = `${path}/${Element}`;
		} else if (state.isDirectory()) {
			await get(`${path}/${Element}`, obj, `${where}/${Element}`);
		} else {
			throw new Error('wrong type in documents');
		}
	}
};
const setMulLevelValue = (
	json: docsStructure,
	level: number,
	list: string[],
	value: string,
	name: string
) => {
	if (!json[list[level]]) {
		json[list[level]] = {};
	}
	if (level == 0) {
		json[list[level]][name] = value;
	} else {
		setMulLevelValue(
			json[list[level]] as docsStructure,
			level - 1,
			list,
			value,
			name
		);
	}
};
const format = async (obj: { json: docsStructure; final: docsStructure }) => {
	const origin = obj.json;
	const final = obj.final;
	Object.keys(origin).map((key) => {
		const whereList = key.split('~');
		if (whereList[0] == '') {
			final[whereList[1]] = origin[key];
		} else {
			const levelList = whereList[0].split('/');
			setMulLevelValue(
				final,
				levelList.length - 2,
				levelList.reverse(),
				origin[key] as string,
				whereList[1]
			);
		}
	});
};
const getList = async (obj: { json: docsStructure; final: docsStructure }) => {
	return Object.values(obj.json);
};
const getDocumentsStructure = async (documents: string) => {
	const obj: { json: docsStructure; final: docsStructure } = {
		json: {},
		final: {},
	};
	await get(documents, obj, '');
	await format(obj);
	return obj;
};

export { getDocumentsStructure, getList };
