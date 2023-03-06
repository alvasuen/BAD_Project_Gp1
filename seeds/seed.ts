import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("download_status").del();
  await knex("playlists_songs").del();
  await knex("playlists").del();
  await knex("categories_songs").del();
  await knex("categories").del();
  await knex("songs").del();
  await knex("artists").del();
  await knex("users").del();

  // Inserts seed entries
  let [jim, user] = await knex("users")
    .insert([
      {
        email: "123@gmail.com",
        username: "jimsadsa",
        password: await hashPassword("123456"),
      },
      {
        email: "321@gmail.com",
        username: "userrobot",
        password: await hashPassword("123456"),
      },
    ])
    .returning("users_id");

  let [TaiWan, UK] = await knex("categories")
    .insert([{ area: "TaiWan" }, { area: "UK" }])
    .returning("categories_id");

  let [
    singer,
    joji,
    taylor,
    week,
    may,
    black,
    lana,
    Stephen,
    Luke,
    Hozier,
    dhruv,
    Passenger,
    Adele,
    Novo,
    Bon,
    Coldplay,
    Hebe,
    lee,
    Xia,
    Ivana
  ] = await knex("artists")
    .insert([
      { artist_name: "Singer" },
      { artist_name: "Joji" },
      { artist_name: "Taylor Swift" },
      { artist_name: "The Weekend" },
      { artist_name: "MAYDAY" },
      { artist_name: "BLACKPINK" },
      { artist_name: "Lana Del Rey" },
      { artist_name: "Stephen Sanchez" },
      { artist_name: "Luke Chiang" },
      { artist_name: "Hozier" },
      { artist_name: "dhruv" },
      { artist_name: "Passenger" },
      { artist_name: "Adele" },
      { artist_name: "Novo Amor" },
      { artist_name: "Bon Jovi" },
      { artist_name: "Coldplay" },
      { artist_name: "Hebe Tien" },
      { artist_name: "Lee" },
      { artist_name: "Xia Hu" },
      { artist_name: "Ivana Wong" },
    ])
    .returning("artists_id");

  let [
    Something,
    Glimpse,
    Love,
    Save,
    rose,
    hard,
    video,
    until,
    Shouldn,
    take,
    Young,
    double,
    Let,
    Easy,
    Holland,
    It,
    angel,
    my,
    Fix,
    Years,
    hurt
  ] = await knex("songs")
    .insert([
      {
        songs_name:
          "The Chainsmokers & Coldplay - Something Just Like This (Live at the BRITs)",
        artists_id: Coldplay.artists_id,
        image: "https://i.ytimg.com/vi/4u6bWs-ZG0o/sddefault.jpg",
        yt_id: "4u6bWs-ZG0o",
      },
      {
        songs_name: "Joji - Glimpse of Us (Official Video)",
        artists_id: joji.artists_id,
        image: "https://i.ytimg.com/vi/NgsWGfUlwJI/sddefault.jpg",
        yt_id: "NgsWGfUlwJI",
      },
      {
        songs_name: "Taylor Swift - Love Story",
        artists_id: taylor.artists_id,
        image: "https://i.ytimg.com/vi/8xg3vE8Ie_E/sddefault.jpg",
        yt_id: "8xg3vE8Ie_E",
      },
      {
        songs_name: "The Weeknd - Save Your Tears (Official Music Video)",
        artists_id: week.artists_id,
        image: "https://i.ytimg.com/vi/XXYlFuWEuKI/sddefault.jpg",
        yt_id: "XXYlFuWEuKI",
      },
      {
        songs_name: "MAYDAY五月天 [ 玫瑰少年 ] Official Music Video",
        artists_id: may.artists_id,
        image: "https://i.ytimg.com/vi/65IKNssGRPI/sddefault.jpg",
        yt_id: "65IKNssGRPI",
      },
      {
        songs_name: "BLACKPINK - 'Hard to Love' (Official Audio)",
        artists_id: black.artists_id,
        image: "https://i.ytimg.com/vi/7Hr3p1BHC_E/sddefault.jpg",
        yt_id: "7Hr3p1BHC_E",
      },
      {
        songs_name: "Lana Del Rey - Video Games",
        artists_id: lana.artists_id,
        image: "https://i.ytimg.com/vi/cE6wxDqdOV0/sddefault.jpg",
        yt_id: "cE6wxDqdOV0",
      },
      {
        songs_name:
          "Stephen Sanchez - Until I Found You (Official Music Video)",
        artists_id: Stephen.artists_id,
        image: "https://i.ytimg.com/vi/GxldQ9eX2wo/sddefault.jpg",
        yt_id: "GxldQ9eX2wo",
      },
      {
        songs_name: "Shouldn't Be",
        artists_id: Luke.artists_id,
        image: "https://i.ytimg.com/vi/hsLiJP2rqS8/sddefault.jpg",
        yt_id: "hsLiJP2rqS8",
      },
      {
        songs_name: "Hozier - Take Me To Church",
        artists_id: Hozier.artists_id,
        image: "https://i.ytimg.com/vi/PVjiKRfKpPI/sddefault.jpg",
        yt_id: "PVjiKRfKpPI",
      },
      {
        songs_name: "Lana Del Rey - Young and Beautiful",
        artists_id: lana.artists_id,
        image: "https://i.ytimg.com/vi/o_1aF54DO60/sddefault.jpg",
        yt_id: "o_1aF54DO60",
      },
      {
        songs_name: "dhruv - double take (Official Video)",
        artists_id: dhruv.artists_id,
        image: "https://i.ytimg.com/vi/R8FHtIhWqNo/sddefault.jpg",
        yt_id: "R8FHtIhWqNo",
      },
      {
        songs_name: "Passenger | Let Her Go (Official Video)",
        artists_id: Passenger.artists_id,
        image: "https://i.ytimg.com/vi/RBumgq5yVrA/sddefault.jpg",
        yt_id: "RBumgq5yVrA",
      },
      {
        songs_name: "Adele - Easy On Me (Official Video)",
        artists_id: Adele.artists_id,
        image: "https://i.ytimg.com/vi/U3ASj1LA6_sY/sddefault.jpg",
        yt_id: "U3ASj1L6_sY",
      },
      {
        songs_name: "Novo Amor - Holland (official video)",
        artists_id: Novo.artists_id,
        image: "https://i.ytimg.com/vi/usPrYhk9VG8/sddefault.jpg",
        yt_id: "usPrYhk9VG8",
      },
      {
        songs_name: "Bon Jovi - It's My Life (Official Music Video)",
        artists_id: Bon.artists_id,
        image: "https://i.ytimg.com/vi/vx2u5uUu3DE/sddefault.jpg",
        yt_id: "vx2u5uUu3DE",
      },
      {
        songs_name:
          "田馥甄演唱会一曲《魔鬼中的天使》，令人心神寧静，實在太好聽了",
        artists_id: Hebe.artists_id,
        image: "https://i.ytimg.com/vi/tBg4NvJZBI/sddefault.jpg",
        yt_id: "tBg4NvJZBI",
      },
      {
        songs_name: "李代沫 - 我的歌聲裏 MV",
        artists_id: lee.artists_id,
        image: "https://i.ytimg.com/vi/5d3VB4_Gjpk/sddefault.jpg",
        yt_id: "5d3VB4_Gjpk",
      },
      {
        songs_name: "Coldplay - Fix You (Official Video)",
        artists_id: Coldplay.artists_id,
        image: "https://i.ytimg.com/vi/k4V3Mo61fJM/sddefault.jpg",
        yt_id: "k4V3Mo61fJM",
      },
      {
        songs_name: "胡夏 Xia Hu - Those Bygone Years 那些年",
        artists_id: Xia.artists_id,
        image: "https://i.ytimg.com/vi/KqjgLbKZ1h0/sddefault.jpg",
        yt_id: "KqjgLbKZ1h0",
      },
      {
        songs_name:
          "王菀之 Ivana Wong - 我真的受傷了 (The Magical Teeter Totter演唱會2017)",
        artists_id: Ivana.artists_id,
        image: "https://i.ytimg.com/vi/xZAvtEcUnpw/sddefault.jpg",
        yt_id: "xZAvtEcUnpw",
      },
    ])
    .returning("songs_id");

  await knex("categories_songs").insert([
    { songs_id: Something.songs_id, categories_id: UK.categories_id },
    { songs_id: Glimpse.songs_id, categories_id: UK.categories_id },
    { songs_id: Love.songs_id, categories_id: UK.categories_id },
    { songs_id: Save.songs_id, categories_id: UK.categories_id },
    { songs_id: rose.songs_id, categories_id: TaiWan.categories_id },
    { songs_id: hard.songs_id, categories_id: UK.categories_id },
    { songs_id: video.songs_id, categories_id: UK.categories_id },
    { songs_id: until.songs_id, categories_id: UK.categories_id },
    { songs_id: Shouldn.songs_id, categories_id: UK.categories_id },
    { songs_id: take.songs_id, categories_id: UK.categories_id },
    { songs_id: Young.songs_id, categories_id: UK.categories_id },
    { songs_id: double.songs_id, categories_id: UK.categories_id },
    { songs_id: Let.songs_id, categories_id: UK.categories_id },
    { songs_id: Easy.songs_id, categories_id: UK.categories_id },
    { songs_id: Holland.songs_id, categories_id: UK.categories_id },
    { songs_id: It.songs_id, categories_id: UK.categories_id },
    { songs_id: angel.songs_id, categories_id: TaiWan.categories_id },
    { songs_id: my.songs_id, categories_id: TaiWan.categories_id },
    { songs_id: Fix.songs_id, categories_id: UK.categories_id },
    { songs_id: Years.songs_id, categories_id: TaiWan.categories_id },
    { songs_id: hurt.songs_id, categories_id: TaiWan.categories_id },
  ]);

  let [playlist1, ColdplayPlaylist, Chinese, Fav] = await knex("playlists")
    .insert([
      { playlists_name: "Chill", users_id: jim.users_id },
      { playlists_name: "Coldplay Playlist", users_id: jim.users_id },
      { playlists_name: "Chinese Playlist", users_id: jim.users_id },
      { playlists_name: "My Fav", users_id: user.users_id },
    ])
    .returning("playlists_id");

  await knex("playlists_songs").insert([
    { playlists_id: playlist1.playlists_id, songs_id: Something.songs_id },
    { playlists_id: playlist1.playlists_id, songs_id: Glimpse.songs_id },
    { playlists_id: playlist1.playlists_id, songs_id: Love.songs_id },
    { playlists_id: playlist1.playlists_id, songs_id: Save.songs_id },
    {
      playlists_id: ColdplayPlaylist.playlists_id,
      songs_id: Something.songs_id,
    },
    { playlists_id: ColdplayPlaylist.playlists_id, songs_id: Fix.songs_id },

    { playlists_id: Chinese.playlists_id, songs_id: Years.songs_id },
    { playlists_id: Chinese.playlists_id, songs_id: angel.songs_id },
    { playlists_id: Chinese.playlists_id, songs_id: my.songs_id },
    { playlists_id: Chinese.playlists_id, songs_id: rose.songs_id },
    { playlists_id: Chinese.playlists_id, songs_id: hurt.songs_id },

    { playlists_id: Fav.playlists_id, songs_id: Holland.songs_id },
    { playlists_id: Fav.playlists_id, songs_id: It.songs_id },
  ]);
}
