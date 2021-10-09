
		import sumTest0 from "./sum.js";
import babyTest1 from "./baby.js";
import babyTest2 from "./file/baby.js";


		const before = async () => {
			console.log('[test before]');
			return;
		};
		const main = async () => {
			console.log('[test start]');
			
			await sumTest0();
await babyTest1();
await babyTest2();


			return;
		};
		const final = async () => {
			console.log('[test end]');
			return;
		};
		
		before()
			.then(() => main())
			.then(() => final());
		