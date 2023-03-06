import { Request, Response } from "express";
import { form } from "../../helper";
import { errorHandler } from "../../error";
import { SearchService } from "../service/searchService";

export class SearchController {
  constructor(private searchService: SearchService) {}

  loadSinger = async (req: Request, res: Response) => {
    try {
      //Get artists id and artists name
      const singers = await this.searchService.getAllSinger();
      // console.log("test id", singers[0].artists_id);
      // console.log("length:", singers.length);

      let songsArr = [];
      for (let index = 0; index < singers.length; index++) {
        let singerId = singers[index].artists_id;
        // console.log("singerIds", singerId);

        //Get all the songs by the artists id
        let singerSongs = await this.searchService.getSingerSongs(singerId);
        songsArr.push(...singerSongs);
        // console.log("songsArr", songsArr);
      }

      res.json({
        success: true,
        songsArr,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  loadArea = async (req: Request, res: Response) => {
    try {
      //Get category id and area
      const area = await this.searchService.getArea();
      console.log(area);

      let songsArr = [];
      for (let index = 0; index < area.length; index++) {
        // Get all the songs by the categories_id
        let areaSongs = await this.searchService.getAreaSongs(
          area[index].categories_id
        );
        songsArr.push(...areaSongs);
      }

      res.json({
        success: true,
        songsArr,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  //Get all songs for pick out different language songs
  loadLanSongs = async (req: Request, res: Response) => {
    try {
      const allSongs = await this.searchService.getLanSongs();

      res.json({
        success: true,
        allSongs,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  //Get all the result of different tables from user input
  loadSearchInput = async (req: Request, res: Response) => {
    try {
      console.log(req.body);

      let searchContent = req.body.userInput;

      //From songs table
      const getSongs = await this.searchService.getSearchInputSong(
        searchContent
      );
      console.log("getSongs", getSongs);

      // let songsSearchArr = [];
      // if (getSongs.length > 0) {
      //   //step2: find the songs_id by artist_id
      //   for (let num = 0; num < getSongs.length; num++) {
      //     let songsSong = await this.searchService.getSingerSongs(
      //       getSongs[num].songs_id
      //     );
      //     songsSearchArr.push(songsSong);
      //   }
      // }

      //From artists table
      //step1: get artists_id
      const getArtists = await this.searchService.getSearchInputArtist(
        searchContent
      );

      console.log("getArtists", getArtists);

      let artistsSearchArr = [];
      if (getArtists.length > 0) {
        //step2: find the songs_id by artists_id
        for (let num = 0; num < getArtists.length; num++) {
          let artistsSong = await this.searchService.getArtSongs(
            getArtists[num].artists_id
          );
          artistsSearchArr.push(...artistsSong);
        }
      }

      //From categories table
      //step1: get categories_id
      const getArea = await this.searchService.getSearchInputArea(
        searchContent
      );

      console.log("getArea", getArea);

      let areaSearchArr = [];
      if (getArea.length > 1) {
        //step2: find the songs_id by artist_id
        for (let num = 0; num < getArea.length; num++) {
          //step2: find the songs_id by categories_id
          let placeSongs = await this.searchService.getPSongs(
            getArea[num].categories_id
          );
          areaSearchArr.push(...placeSongs);
        }
      }

      //Add all songs_id
      let allSongsId = [];
      allSongsId.push(...getSongs);
      allSongsId.push(...artistsSearchArr);
      allSongsId.push(...areaSearchArr);
      console.log("allSongsId", allSongsId);

      let genAll = [];
      if (allSongsId.length > 1) {
        //Remove duplicate id
        let arrToSet = new Set(allSongsId);
        let songsIdArr = [...arrToSet];
        for (let index = 0; index < songsIdArr.length; index++) {
          let genAllSongs = await this.searchService.getSongsBySId(
            songsIdArr[index].songs_id
          );
          genAll.push(...genAllSongs);
        }
      } else {
        for (let index = 0; index < allSongsId.length; index++) {
          let genAllSongs = await this.searchService.getSongsBySId(
            allSongsId[index].songs_id
          );
          genAll.push(...genAllSongs);
        }
      }
      console.log("genAll", genAll);

      res.json({
        success: true,
        genAll,
        // songsIdArr,
        // getSongs,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  setLoadSongs = async (req: Request, res: Response) => {
    try {
      let songsId = req.body.songs_id;
      const songsById = await this.searchService.getSongsBySId(songsId);

      res.json({
        success: true,
        songsById,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
}
