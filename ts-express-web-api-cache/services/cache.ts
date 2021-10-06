import express from 'express';
import util from 'util';
import redis from 'redis';
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get) as any;
client.on('error', (err: Error) => {
	console.log(err);
});

const setRedis = (key: string, val: any, timeout = 60 * 60) => {
	if (typeof val === 'object') {
		val = JSON.stringify(val);
	}
	client.set(key, val);
	client.expire(key, timeout);
};

const cache = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.path != '/users') {
		next();
		return;
	}
	const data = (await client.get(req.path)) as unknown as string;
	if (data == null) {
		next();
		return;
	}
	console.log(JSON.parse(data));
	res.json(JSON.parse(data));
	return;
};

export { cache, setRedis };
