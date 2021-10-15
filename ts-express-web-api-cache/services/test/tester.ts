import colors from 'chalk';

class tester {
	_beforeFunc: () => void;
	_mainFunc: () => void;
	_finalFunc: () => void;
	_name: string;
	_comment: string;

	constructor(name: string) {
		this._name = name;
		this._comment = 'do not have comment';
		this._beforeFunc = null;
		this._mainFunc = () => {};
		this._finalFunc = () => {};
	}
	before = (func) => {
		this._beforeFunc = func;
	};
	main = (func) => {
		this._mainFunc = func;
	};
	final = (func) => {
		this._finalFunc = func;
	};

	set comment(str: string) {
		this._comment = str;
	}
	get comment() {
		return this._comment;
	}

	test = async () => {
		if (this._beforeFunc != null) {
			console.log(colors.yellow(`${this._name} test before`));
			await this._beforeFunc();
		}
		console.log(colors.green(`${this._name} test start`));
		await this._mainFunc();
		console.log(colors.blue(`${this._name} test end`));
		await this._finalFunc();
		return;
	};
}

export default tester;
