import { Request, Response } from "express";
import { ProfileService } from "../service/profileService";
import { form } from "../../helper";
import { errorHandler } from "../../error";

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  loadProfile = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.query.id);
      console.log("User id: ", userId);

      const profileUsername = await this.profileService.getProfileNameByUserId(
        userId
      );

      const profilePlaylist = await this.profileService.getProfilePlaylist(
        userId
      );

      const profilePlaylistSongId =
        await this.profileService.getProfilePlaylistSongId(
          profilePlaylist[0].playlists_id
        );

      const profilePlaylistSong =
        await this.profileService.getProfilePlaylistSong(
          profilePlaylistSongId[0].songs_id
        );

      res.json({
        success: true,
        profileUsername,
        profilePlaylist,
        // profilePlaylistSongId,
        profilePlaylistSong,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
