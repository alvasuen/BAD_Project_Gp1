import {Knex} from "knex";

export class StatusService {
    constructor(private knex: Knex){
        this.knex =knex;
    }
    statusCheck= async (id: number)=>{
        let result = await this.knex.select("title", "image", "status").from ("download_status").where ("users_id", id)
        return result;
    }
    
}