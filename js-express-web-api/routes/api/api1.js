'use strict';
import express from 'express';
import getConst from '../../service/util/const.js';

const router = express.Router();

router.post('/', async (req, res) => {
	console.log(getConst('const1'));
	res.status(200).end('OK');
});

export default router;
