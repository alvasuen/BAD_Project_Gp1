import {Knex} from "knex";

export class YtdlService {
    constructor(private knex:Knex){
        this.knex = knex;
    }

    newSong = async (title:string, ytId:string,thumbnail:string|any )=>{
        await this.knex
        .insert({
            songs_name: title,
            yt_id:ytId,
            image:thumbnail.url})
        .into("songs")
        return {success:true};
    }

    download_update = async (title: string, ytId: string, url: string)=>{
        await this.knex
        .insert({
            title: title,
            ytId: ytId,
            url: url
        })
    }
}
