import { MusixMatchAPI } from "../dist/index";
import { jest } from "@jest/globals";

const mm = new MusixMatchAPI();

describe("MusixMatchAPI", () => {
  jest.setTimeout(30000); // Set timeout to 30 seconds for API requests

  test("searchTracks", async () => {
    const searchTracks = await mm.searchTracks({
      query: "Shape of you",
      page: 1,
    });
    expect(searchTracks.message.header.status_code).toBe(200);
    expect(searchTracks.message.body.track_list.length).toBeGreaterThan(0);
  });

  test("getTrack", async () => {
    const track = await mm.getTrack("274879091");
    expect(track.message.header.status_code).toBe(200);
    expect(track.message.body.track.track_id).toBe(274879091);
  });

  test("getTrackLyrics", async () => {
    const lyrics = await mm.getTrackLyrics("274879091");
    expect(lyrics.message.header.status_code).toBe(200);
    expect(lyrics.message.body.lyrics.lyrics_id).toBeGreaterThan(0);
  });

  test("searchArtist", async () => {
    const searchArtist = await mm.searchArtist("Ed-Sheeran");
    expect(searchArtist.message.header.status_code).toBe(200);
    expect(searchArtist.message.body.artist_list.length).toBeGreaterThan(0);
  });

  test("getArtist", async () => {
    const artist = await mm.getArtist("118");
    expect(artist.message.header.status_code).toBe(200);
    expect(artist.message.body.artist.artist_id).toBe(118);
  });

  test("getArtistAlbums", async () => {
    const artistAlbums = await mm.getArtistAlbums("118", 1);
    expect(artistAlbums.message.header.status_code).toBe(200);
    expect(artistAlbums.message.body.album_list.length).toBeGreaterThan(0);
  });

  test("getAlbum", async () => {
    const album = await mm.getAlbum("32541950");
    expect(album.message.header.status_code).toBe(200);
    expect(album.message.body.album.album_id).toBe(32541950);
  });

  test("getAlbumTracks", async () => {
    const albumTracks = await mm.getAlbumTracks("14250450", 1);
    expect(albumTracks.message.header.status_code).toBe(200);
    expect(albumTracks.message.body.track_list.length).toBeGreaterThan(0);
  });

  test("getTrackLyricsTranslation", async () => {
    const translation = await mm.getTrackLyricsTranslation("274879091", "es");
    expect(translation.message.header.status_code).toBe(200);
    expect(translation.message.body.translations_list.length).toBeGreaterThan(
      0
    );
  });
});
