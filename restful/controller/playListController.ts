import { Request, Response } from "express"
import { PlaylistsService } from '../service/playListService'
import { form } from '../../helper'

export class PlaylistsController {
    constructor(private playlistsService: PlaylistsService) { }
    loadPlaylist = async (req: Request, res: Response) => {
        try {
            const playlists_id = Number(req.query.id)
            const playlists = await this.playlistsService.loadPlaylist(playlists_id)
            res.json({ playlists })
        } catch (err) {
            res.json({ success: false })
            console.log(err);

        }


    }
}
