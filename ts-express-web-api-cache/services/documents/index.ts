import express from 'express';
import translation from './translate.js';
import { getDocumentsStructure, getList } from './readFile.js';

const markdownIt = (path: string) => {
	return async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const param = req.query.path as string;
		const structure = await getDocumentsStructure(path);
		if (!param) {
			// 查看文件結構
			//res.json(structure.final);
			const where = req.path.split('/');
			let tmp: any = structure.final;
			for (let key of where) {
				if (key == '') continue;
				tmp = tmp[decodeURI(key)];
			}
			res.render('document', {
				data: tmp,
				beforePath: '/documents' + (req.path == '/' ? '' : req.path),
			});
			return;
		}
		// 獲取 token 列表
		const tokenList = await getList(structure);
		if (!tokenList.includes(param)) {
			res.status(403).send('<h1>403 forbidden</h1>');
			return;
		}
		// render 特定 md
		try {
			res.send(
				'<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.0.0/mermaid.min.js"></script>' +
					`<link rel="stylesheet" href="/stylesheets/main.css" />` +
					(await translation(param)) +
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
