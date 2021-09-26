const getConst = (string) => {
	switch (string) {
		case 'const1':
			return 'AAA';
		case 'const2':
			return 'BBB';
		default:
			console.log('error constant');
			return null;
	}
};

export default getConst;
