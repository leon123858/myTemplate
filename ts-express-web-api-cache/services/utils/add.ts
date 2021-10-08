import fetch from '../../node_modules/node-fetch/src/index.js';

export default async (a: number, b: number) => {
	//const response = await fetch('https://github.com/');
	//const body = await response.text();
	//console.log(body);
	return (a + b) as number;
};
