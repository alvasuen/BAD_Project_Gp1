import express from 'express'
import path from 'path'
import { errorHandler } from '../../error'
import { formidable_promise } from '../../helper'
import { HTTPError } from '../../http-error'
import { userService } from '../service/userService'
/* Route handling */
type User = {
    username: string
    password: string
    confirmPassword: string
    email: string
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
            let user = await userService.signup(obj)
            
            req.session.userId = user.users_id
            req.session.username = obj.username
            req.session.isLogin = true
                
            if(!obj.email) throw new HTTPError(400, 'Missing email')
            if(typeof obj.email !== 'string' || !obj.email.includes('@')){
                throw new HTTPError(
                    400, 
                    'Invalid email, should provide a regular email'
                )
            }
            
            res.redirect('/')
        } catch (err) {
             errorHandler(err,req,res)
        }
        
    }

    login = async(req:express.Request, res: express.Response)=>{
        try {
            let {username , password} = await formidable_promise(req) as User
            if (!username) throw new HTTPError(400, 'Missing username')
            if (!password) throw new HTTPError(400, 'Missing Password')
            let userId = await userService.login({username, password})
            
            req.session.userId = userId
            req.session.username = username
            req.session.isLogin = true

            res.json({
                ok:true,
            })
        } catch (err) {
             errorHandler(err,req,res)
        }
    }
    logout = async (req:express.Request, res: express.Response)=>{
        try {
            delete req.session.userId
            delete req.session.username
            delete req.session.isLogin
            res.json({
                isLogin:false,
                isErr:false
            })    
        } catch (err) {
            errorHandler(err,req,res)
        }
        
        
    }

    getUser = async (req:express.Request, res: express.Response)=>{
        try {
        let userId = req.session.userId!
        let user = await userService.getUser(userId)
        console.log(user)
        let result = {...user,isLogin:req.session.isLogin,isErr:false}
        res.json(result)
        } catch (err) {
            errorHandler(err,req,res)
        }
        
}
}
