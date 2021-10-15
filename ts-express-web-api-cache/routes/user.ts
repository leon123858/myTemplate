/*
 * GET users listing.
 */
import express from "express";
import { setRedis } from "../services/cache.js";
const router = express.Router();

router.post("/", (req: express.Request, res: express.Response) => {
  console.log(req.body);
  res.json(req.body);
  //setRedis('/users', req.body);
});

export default router;
