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

      console.log(profilePlaylist);
      console.log(profilePlaylist.length);
      
      let profilePlaylistSongs = [];
      for (let index = 0; index < profilePlaylist.length; index++) {
        let profilePlaylistSongId =
          await this.profileService.getProfilePlaylistSongId(
            profilePlaylist[index].playlists_id
           
            
          );
          console.log(profilePlaylist[index].playlists_id);
        profilePlaylistSongs.push(profilePlaylistSongId);
      }


      // console.log("profilePlaylistSongs",profilePlaylistSongs);
      

      res.json({
        success: true,
        profileUsername,
        profilePlaylistSongs,
        profilePlaylist
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
