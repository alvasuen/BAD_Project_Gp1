import cors from 'cors';
import express from "express";
import { print } from 'listening-on';
import path from 'path';
import { userRoutes } from './restful/route/route'
import { env } from './env'
import { UserController } from './restful/controller/userController';
import { sessionMiddleware } from './session';

let app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let p2 = path.join(__dirname, 'uploads')
// console.log(p2)
app.use(express.static(p2))
let p = path.join(__dirname, "public")
app.use(express.static(p))

app.use(sessionMiddleware);

app.use('/', userRoutes)
app.get('*', async (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(p, 'error.html'))
})
app.use('/', playlistRoutes)

let port = env.PORT
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})