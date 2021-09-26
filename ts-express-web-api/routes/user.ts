/*
 * GET users listing.
 */
import express from 'express';
const router = express.Router();

router.post('/', (req: express.Request, res: express.Response) => {
	console.log(req.body);
	res.json(req.body);
});

export default router;
