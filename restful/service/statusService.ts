import {Knex} from "knex";

export class StatusService {

    constructor(private knex: Knex){
        this.knex =knex;
    }

        statusCheck= async (id: number)=>{
            
            let check = await this.knex.select ("status_id", "created_at").from("download_status").where("message", "In Progress")
            for (let i =0; i< check.length; i++){
                const currDate = new Date ()
                const oldDate = new Date (check[i].created_at)
                let diff = (currDate.getTime()-oldDate.getTime())/60000
                console.log({diff});
                if (diff>120){
                    await this.knex("download_status").update("message","Download timeout!").where("status_id", check[i].status_id)
                }
            }
            let result = await this.knex.select("title", "image", "status", "message", "ytId", "songs_id").from ("download_status").where ("users_id", id).orderBy("created_at", "DESC")
            return result;
        }

}