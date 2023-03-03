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

      let singerId = req.body.singer_id;
      //Get all the songs by the artists id
      const singerSongs = await this.searchService.getSingerSongs(singerId);

      res.json({
        success: true,
        singerSongs,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  loadArea = async (req: Request, res: Response) => {
    try {
      //Get category id and area
      const area = await this.searchService.getArea();

      let categoryId = req.body.categories_id;
      //Get all the songs by the categories_id
      const areaSongs = await this.searchService.getAreaSongs(categoryId);

      res.json({
        success: true,
        areaSongs,
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
      let searchContent = req.body.userInput;
      //From songs table
      const getSongs = await this.searchService.getSearchInputSong(
        searchContent
      );

      //From artists table
      //step1: get artists_id
      const getArtists = await this.searchService.getSearchInputArtist(
        searchContent
      );
      //step2: find the songs_id by artist_id
      const artistsSongs = await this.searchService.getArtSongs(
        getArtists.artist_id
      );

      //From categories table
      //step1: get categories_id
      const getArea = await this.searchService.getSearchInputArea(
        searchContent
      );

      //step2: find the songs_id by categories_id
      const placeSongs = await this.searchService.getPSongs(
        getArea.categories_id
      );

      //Add all songs_id
      let allSongsId = [];
      allSongsId.push(...getSongs);
      allSongsId.push(...artistsSongs);
      allSongsId.push(...placeSongs);

      //Remove duplicate id
      let arrToSet = new Set(allSongsId);
      let songsIdArr = [...arrToSet];

      res.json({
        success: true,
        songsIdArr,
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
