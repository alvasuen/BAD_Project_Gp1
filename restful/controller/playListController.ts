import { Request, Response } from "express"
import { PlaylistsService } from '../service/playListService'
import { form } from '../../helper'

export class PlaylistsController {
    constructor(private playlistsService: PlaylistsService) { }
    loadPlaylist = async (req: Request, res: Response) => {
        try {

            const playlists_id = Number(req.query.id)
            console.log("playlist id: " + playlists_id);

            const playlists = await this.playlistsService.loadPlaylist(playlists_id)

            res.json({ playlists })
        } catch (err) {
            console.log(err);
            res.json({ success: false })
        }


    }

    getPlayListByUser = async (req: Request, res: Response) => {
        try {
            let userId = req.session.userId!
            console.log(userId);

            const playlists = await this.playlistsService.getPlayListByUserId(userId)
            console.log(playlists);

            res.json({ playlists })
            return;

        } catch (err) {
            console.log(err);
            res.json({ success: false })
        }
    }
}

