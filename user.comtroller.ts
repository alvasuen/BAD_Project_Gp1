import express from 'express'
import path from 'path'
import { HTTPError } from './http-error'
import { UserService } from './user-service'

export class UserController{
    constructor(private userService: UserService){}

    signup= async(req: express.Request, res: express.Response)=>{
        try {
            let { username, password } = req.body

            if(!username) throw new HTTPError(400, 'Missing username')
            if(typeof username !== 'string' || username.length <3){
                throw new HTTPError(
                    400,
                    'Invalid username, should has at least 3 character',
                )
            }

            if(!password) throw new HTTPError(400, 'Missing password')
            if(typeof password !== 'string' || password.length < 6){
                throw new HTTPError(
                    400,
                    'Invalid password, should has at least 6 characters',
                )
            }

            let user = await this.userService.signup({username, password})
            req.session.user ={
                id: user.id,
                username,
            }
            req.session.save()
            res.redirect('/')
        } catch (error) {
            console.log('');
            
        }
    }
}