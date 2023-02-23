
import { comparePassword, hashPassword } from '../../hash';
import { HTTPError } from '../../http-error';
import {knex} from '../../db';
class UserService{
    constructor(){}

    async signup(
        username:string, 
        password:string
    ):Promise<{id:number}>{
     return await knex
       .insert({
         username: username,
         password_hash: await hashPassword(password),
       })
       .into('users')
       .returning('id')
    }
    async login(input:{
        username:string 
        password:string
    }){
        let result = await knex.raw(
        /* sql */ `select id, password_hash from users where username = ?`,
        [input.username],
        )
    let user = result.rows[0]
    if (!user) {
      throw new HTTPError(404, 'this username is not registered')
    }
    if (
      !(await comparePassword({
        password: input.password,
        password_hash: user.password_hash,
      }))
    ) {
      throw new HTTPError(401, 'wrong username or password')
    }
    return {
      id: user.id,
    }
    }
}
export let userService = new UserService();