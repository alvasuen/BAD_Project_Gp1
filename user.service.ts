/* Database相關 */
import pg from 'pg';
import { comparePassword } from './hash';

export class UserServices{
    constructor(private client: pg.Client){}
    async login(input:{
        username:string 
        password:string
    }): Promise<{id: number}> {
        let result = await this.client.query(
            /* sql */ `select id, password_hash from users where username = $1`,
            [input.username],
        )
        let user = result.rows[0]
        if(!user){
            throw new Error('this username is not registered')
        }
        comparePassword({
            password: input.password,
            password_hash: user.password_hash,
        })
        return user
    }
}