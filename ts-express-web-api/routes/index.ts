/*
 * GET home page.
 */
import express from 'express';
import add from '../services/utils/add.js';
const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
	console.log(await add(5, 5));
	res.render('index', { title: 'Express' });
});

export default router;
