import cors from 'cors';
import express from "express";
import { print } from 'listening-on';
import path from 'path';
import {userRoutes} from './user'
import { env } from './env'

let app = express()

app.use(express.static('public'));
// app.use(cors())

let port = 8000
app.listen(port, () => {
  print(port)
})