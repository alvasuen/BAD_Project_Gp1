import { Request, Response } from "express"
import { PlaylistsService } from '../service/playListService'

import { errorHandler } from "../../error"

export class PlaylistsController {
    constructor(private playlistsService: PlaylistsService) { }
    loadPlaylist = async (req: Request, res: Response) => {
        try {
            console.log(req.session.userId, '10');

            const userId = req.session.userId!
            const playlists_id = Number(req.params.id)
            // const songs = Number(req.params.songs)

            const songs = await this.playlistsService.loadPlaylist(playlists_id, userId)


            res.json({ songs })
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
}

