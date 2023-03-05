import {Knex} from "knex";

export class VideoService{
    constructor(private knex:Knex){
        this.knex = knex;
    }    

    videos = async (id:string | any)=>{
        let ytId = await this.knex("songs").select("yt_id").where("songs_id", id)
        return ytId;
    }

    playlist =  async (playlists_id: string| any)=>{
        
        
        let ytId = await this.knex("songs")
          .select("yt_id")
          .whereIn("songs_id", function () {
            this.select("songs_id")
              .from("playlists_songs")
              .where("playlists_id", playlists_id);
          })
          .orderBy("songs.songs_id", "asc");
 
        return ytId;
    }
}