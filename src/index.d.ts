import {
  GetAlbumResponse,
  GetAlbumTracksResponse,
  GetArtistAlbumsResponse,
  GetArtistResponse,
  GetLyricsResponse,
  GetTrackLyricsTranslationResponse,
  GetTrackResponse,
  SearchArtistsResponse,
  SearchTracksResponse,
} from "./types";

export declare class MusixMatchAPI {
  private baseUrl: string;
  private headers: Record<string, string>;
  private proxies: any;
  private secret: string | null;

  constructor(proxies?: any);

  private getLatestApp(): Promise<string>;

  private getSecret(): Promise<string>;

  private generateSignature(url: string): Promise<string>;

  private makeRequest(endpoint: string): Promise<any>;

  searchTracks(options: {
    query?: string;
    track?: string;
    artist?: string;
    page: number;
  }): Promise<SearchTracksResponse>;

  getTrack(
    trackId?: string | null,
    trackIsrc?: string | null
  ): Promise<GetTrackResponse>;

  getTrackLyrics(
    trackId?: string | null,
    trackIsrc?: string | null
  ): Promise<GetLyricsResponse>;

  searchArtist(query: string, page?: number): Promise<SearchArtistsResponse>;

  getArtist(artistId: string): Promise<GetArtistResponse>;

  getArtistAlbums(
    artistId: string,
    page?: number
  ): Promise<GetArtistAlbumsResponse>;

  getAlbum(albumId: string): Promise<GetAlbumResponse>;

  getAlbumTracks(
    albumId: string,
    page?: number
  ): Promise<GetAlbumTracksResponse>;

  getTrackLyricsTranslation(
    trackId: string,
    language: string
  ): Promise<GetTrackLyricsTranslationResponse>;

  rawRequest(endpoint: string): Promise<any>;
}
