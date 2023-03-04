import {Knex} from "knex";

export class YtdlService {
    constructor(private knex:Knex){
        this.knex = knex;
    }

    newSong = async (title:string, ytId:string,thumbnail:string|any )=>{
        let a = await this.knex
        .insert({
            songs_name: title,
            yt_id:ytId,
            image:thumbnail.url})
        .into("songs")
        .returning("songs_id")
        return a;
    }

    download_status = async (title: string, ytId: string, url: string, status: number, users_id: number, thumbnail:string|any, message: string, )=>{
        let a = await this.knex
        .insert({
            title: title,
            ytId: ytId,
            url: url,
            status: status,
            users_id: users_id,
            image: thumbnail,
            message: message,
        }).into("download_status")
        .returning("status_id")
        return a;
    }

    checkDuplicate = async (ytId:string)=>{
        let x = await this.knex.select("*").from("songs").where("yt_id", ytId)
        return x;
    }

    updateDuplicate_status = async (id: number)=>{
        await this.knex("download_status")
        .update({
            message: "Duplicated! Please enjoy the karaoke video by searching it in our library!"
        })
        .where("status_id", id)
    } 

    download_update = async (id:number|any, status_id : number|any)=>{
        await this.knex.insert({songs_id: id}).into("download_status").where(status_id, status_id)
        
    }

}
