import { Request, Response } from "express";
import { ProfileService } from "../service/profileService";
import { form } from "../../helper";
import { errorHandler } from "../../error";

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  loadProfile = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.query.id);
      // console.log("User id: ", userId);

      const profileUsername = await this.profileService.getProfileNameByUserId(
        userId
      );

      const profilePlaylist = await this.profileService.getProfilePlaylist(
        userId
      );

      let profilePlaylistSongIdArr = [];
      for (let index = 0; index < profilePlaylist.length; index++) {
        let profilePlaylistSongId =
          await this.profileService.getProfilePlaylistSongId(
            profilePlaylist[index].playlists_id
          );
        profilePlaylistSongIdArr.push(profilePlaylistSongId);
      }
      // console.log(profilePlaylistSongIdArr);

      let songsArr = [];
      for (let index = 0; index < profilePlaylistSongIdArr.length; index++) {
        for (let num = 0; num < profilePlaylistSongIdArr[index].length; num++) {
          let profilePlaylistSong =
            await this.profileService.getProfilePlaylistSong(
              profilePlaylistSongIdArr[index][num].songs_id
            );
          songsArr.push(profilePlaylistSong);
        }
      }

      res.json({
        profilePlaylistSongIdArr,
        profilePlaylist,
        songsArr,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
// success: true,
// profileUsername,
// profilePlaylist,
// // profilePlaylistSongId,
// profilePlaylistSong,
