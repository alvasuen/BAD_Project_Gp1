import { Request, Response } from "express"
import { PlaylistsService } from '../service/playListService'

import { errorHandler } from "../../error"

export class PlaylistsController {
    constructor(private playlistsService: PlaylistsService) { }
    loadPlaylist = async (req: Request, res: Response) => {
        try {
            // console.log(req.session.userId, '10');

            const userId = req.session.userId!
            const playlists_id = Number(req.params.id)
            // const songs = Number(req.params.songs)

            const result = await this.playlistsService.loadPlaylist(playlists_id, userId)


            res.json({ result,});
        } catch (err) {
            // console.log(err);
            // res.json({ success: false })
            errorHandler(err, req, res)
        }
    }

    getPlayListByUser = async (req: Request, res: Response) => {
        try {
            let userId = req.session.userId!
            // console.log(userId);

            const playlists = await this.playlistsService.getPlayListByUserId(userId)
            // console.log(playlists);

            res.json(playlists)
            return;

        } catch (err) {
            // console.log(err);
            res.json({ success: false })
        }
    }

    addSongToPlayList = async (req:Request, res:Response)=>{
        try{
            let playlists_id = req.body.playlists_id
            let songs_id = req.body.songs_id
            console.log(playlists_id,songs_id );
            
            await this.playlistsService.addSongToPlayList(playlists_id, songs_id)
            res.json({success:true})
        }catch (err){
            errorHandler(err, req, res)
        }
    }

    createPlaylist = async (req:Request, res:Response)=>{
        try{
            let playlist_name = req.body.content
            await this.playlistsService.createPlaylist(playlist_name, req.session.userId as number)
            res.json({success:true})
        }catch (err){
            errorHandler(err, req, res)
        }
    }
}

