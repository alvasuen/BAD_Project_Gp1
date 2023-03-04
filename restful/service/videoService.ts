import {Knex} from "knex";

export class VideoService{
    constructor(private knex:Knex){
        this.knex = knex;
    }
    
    videos = async (id:string | any)=>{
        let ytId = await this.knex("songs").select("yt_id").where("songs_id", id)
        return ytId;
    }

}