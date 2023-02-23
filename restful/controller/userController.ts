import express from 'express'
import path from 'path'
import { formidable_promise } from '../../helper'
import { HTTPError } from '../../http-error'
import { userService } from '../service/userService'
/* Route handling */
type User = {
    username: string
    password: string
    confirmPassword: string
}
export class UserController{
    constructor(){}

    signup = async(req: express.Request, res: express.Response)=>{
        try {
            let obj = await formidable_promise(req) as User
            
            // let { username, password, confirmPassword } = req.body

            if(!obj.username) throw new HTTPError(400, 'Missing username')
            if(typeof obj.username !== 'string' || obj.username.length < 3){
                throw new HTTPError(
                    400,
                    'Invalid username, should has at least 3 character',
                )
            }

            if(!obj.password) throw new HTTPError(400, 'Missing password')
            if(typeof obj.password !== 'string' || obj.password.length < 6){
                throw new HTTPError(
                    400,
                    'Invalid password, should has at least 6 characters',
                )
            }
            if(obj.password !== obj.confirmPassword) throw new HTTPError(400, 'Password and confirm Password not matched')
            let user = await userService.signup(obj.username, obj.password)
            req.session.user ={
                id: user.id,
                username:obj.username,
            }
            req.session.save()
            res.redirect('/')
        } catch (error) {
                  console.log('failed to signup:', error)
      if (error && typeof error == 'object' && 'status' in error) {
        res.status((error as HTTPError).status)
      } else {
        res.status(500)
      }
      res.json({ error: String(error) })
        }
        
    }

    login = async(req:express.Request, res: express.Response)=>{
        try {
            let {username , password} = req.body
            if (!username) throw new HTTPError(400, 'Missing username')
            if (!password) throw new HTTPError(400, 'Missing Password')
            let user = await userService.login({username, password})
            req.session.user = {
                id: user.id,
                username,
            }
            req.session.save()
            res.redirect('/')
        } catch (error) {
            if (error && typeof error == 'object' && 'status' in error){
                res.status(500)
            }
            res.json({error: String(error)})
        }
    }
    logout = (req:express.Request, res: express.Response)=>{
        req.session.destroy(err =>{
            if (err){
                res.status(502)
                res.end('Failed to destroy session')
            }else{
                res.redirect('/')
            }
        })
    }

    getUser = (req:express.Request, res: express.Response)=>{
        if (req.session.user){
            res.sendFile(path.resolve(path.join('public', 'admin.css')))
        }else{
            res.sendFile(path.resolve(path.join('public', 'guest.css')))
        }
}
}
