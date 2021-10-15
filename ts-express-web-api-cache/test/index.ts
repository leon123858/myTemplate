import { before, main, final } from '../services/test/runner.js';
import sumTest0 from "./sum.js";
import markdown2HtmlTest1 from "./documents/markdown2Html.js";
import docStructureTest2 from "./documents/docStructure.js";

(async () => {
	await before('{"sum.ts":"test if sum function can work","documents":{"markdown2Html.ts":"from markdown path to html","docStructure.ts":"get documents dir structure"}}',3);
	const errors = await main([sumTest0,markdown2HtmlTest1,docStructureTest2]);
	await final({ array: errors.errList, comments: errors.errComments });
})();