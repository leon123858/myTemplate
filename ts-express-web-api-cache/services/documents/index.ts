import express from 'express';
import translation from './translate.js';
import getDocumentsStructure from './readFile.js';
const markdownIt = (path: string) => {
	return async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const params = req.query;
		const keyList = Object.keys(params);
		if (keyList.length == 0) {
			// 查看文件結構
			const structure = await getDocumentsStructure(path);
			res.json(structure);
			return;
		}
		// render 特定 md
		try {
			res.send(
				'<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.0.0/mermaid.min.js"></script>' +
					(await translation(params[keyList[0]].toString())) +
					`<script>
            var config = {
              startOnLoad:true,
              theme: 'forest',
              flowchart:{
                useMaxWidth:false,
                htmlLabels:true
              }
            };
            mermaid.initialize(config);
            window.mermaid.init(undefined, document.querySelectorAll('.language-mermaid'));
          </script>`
			);
		} catch (err) {
			next();
		}
		return;
	};
};

export default markdownIt;
