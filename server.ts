import cors from 'cors';
import express from "express";
import { print } from 'listening-on';
import path from 'path';
import {userRoutes} from './restful/route/route'
import { env } from './env'
import { UserController } from './restful/controller/userController';

let app = express()

app.use(express.static('public'));
// app.use(cors())

app.use('/user', userRoutes)

let port = env.PORT
app.listen(port, () => {
   console.log(`http://localhost:${port}`);
})